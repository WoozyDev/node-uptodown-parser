const { default: axios } = require("axios");
const htmlParser = require('node-html-parser').default;

let _platform = 'android';

function parseSearch(data) {
    let content = htmlParser(data);

    return [...content.querySelectorAll('.item')].map(a => {
        let img = a.childNodes[1].childNodes[1].attrs.src;
        let page = a.childNodes[3].childNodes[1].attrs.href;
        let title = a.childNodes[3].childNodes[1].textContent;
        let desc = a.childNodes[5].childNodes[0].text;
        return {
            platform,
            img,
            page,
            title,
            desc
        }
    });
}

function parseGamePage(data) {
    let content = htmlParser(data);
    let title = content.getElementById('detail-app-name').childNodes[0].text.replace('\n', '');
    let description = content.querySelector('.detail').childNodes[7].text;
    let version = content.querySelector('.detail').childNodes[3].childNodes[3].textContent.replace('\n', '');
    let gallery = content.querySelector('.gallery').childNodes.filter(a => a.text != '\n').map(_gal => {
        return _gal.childNodes[1].childNodes[5].attrs.src;
    });
    let faqs = content.querySelectorAll('.question-content').map(questionHtml => {
        let question = questionHtml.childNodes[1].textContent.trim();
        let answer = questionHtml.childNodes[3].textContent.trim();
        return {
            question,
            answer
        }
    })
    let infoContent = content.querySelectorAll('.content').find(a => a.tagName == 'TABLE');
    let packageName, license, category, author, date, advertisment, system, language, downloads, contentRating;
    infoContent.childNodes.map(node => {
        if(node.classList) {
            if(node.classList.contains('full')) {
                let _title = node.childNodes[3].textContent.replace('\n', '');
                let _desc = node.childNodes[4].textContent;
                switch(_title) {
                    case 'Package Name':
                        packageName = _desc;
                        break;
                    case 'Advertisement':
                        advertisment = _desc;
                        break;
                }
            } else {
                let _title = node.childNodes[3].textContent.replace('\n', '');
                let _desc = node.childNodes[5].textContent;
                switch(_title) {
                    case 'License':
                        license = _desc;
                        break;
                    case 'Op. System':
                        system = _desc;
                        break;
                    case 'Category':
                        category = node.childNodes[5].childNodes[0].textContent.replace('\n', '');
                        break;
                    case 'Language':
                        language = node.childNodes[5].childNodes[0].textContent.replace('\n', '').trim();
                        break;
                    case 'Author':
                        author = node.childNodes[4].childNodes[0].textContent.replace('\n', '');
                        break;
                    case 'Downloads':
                        downloads = node.childNodes[4].childNodes[0].textContent.replace('\n', '');
                        break;
                    case 'Date':
                        date = _desc;
                        break;
                    case 'Content Rating':
                        contentRating = node.childNodes[4].childNodes[0].textContent.replace('\n', '');
                        break;
                }
            }
        }
    })
    let olderVersions = [
        ...content.getElementById('versions-items-list').childNodes.filter(a => a.tagName == 'DIV').map(a => {
            let apkType = a.childNodes[1].textContent;
            let oldVersion = a.childNodes[3].textContent;
            let androidVersion = a.childNodes[5].textContent;
            let versionDate = a.childNodes[7].textContent;
            return {apkType,oldVersion,androidVersion,versionDate};
        }),
        { url: content.querySelector('.button.version').attrs.href }
    ];
    return {
        platform,
        title,
        version,
        description,
        gallery,
        faqs,
        info: {
            packageName,
            license,
            category,
            author,
            date,
            advertisment,
            system,
            language,
            downloads,
            contentRating
        },
        olderVersions
    };
}

function parseDownload(data) {
    let content = htmlParser(data);
    let detailButton = content.getElementById('detail-download-button');
    if(detailButton && detailButton.attrs['data-url']) {
        return {
            platform,
            url: `https://dw.uptodown.com/dwn/${detailButton.attrs['data-url']}`,
        };
    }
    return `Not Found`;
}

module.exports = {
    usePlatform(platform) {
        _platform = platform;
        return this;
    }, 
    autocomplete(query) {
        return new Promise((resolve, reject) => {
            axios.post(`https://en.uptodown.com/${_platform}/en/s`, {
                queryString: query
            }, {
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                }
            }).then(res => {
                if(res.data && typeof res.data != 'string') {
                    if(res.data.success != undefined && res.data.success == 1) {
                        if(res.data.data == undefined) return resolve([]);
                        resolve(res.data.data.map(a => {
                            a.name = a.name.split('<b>').filter(a => a != '').join('')
                                            .split('</b>').filter(a => a != '').join('');
                            return a;
                        }));
                    } else {
                        reject(null);
                    }
                } else {
                    reject(null);
                }
            }).catch(reject);
        })
    },
    search(query) {
        return new Promise((resolve, reject) => {
            axios.post(`https://en.uptodown.com/${_platform}/search`, {
                singlebutton: "",
                q: query
            }, {
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                }
            }).then(res => {
                resolve(parseSearch(res.data));
            }).catch(reject);
        })
    },
    get_game(pageUrl) {
        return new Promise((resolve, reject) => {
            axios.get(pageUrl).then(res => {
                resolve(parseGamePage(res.data));
            }).catch(reject);
        })
    },
    get_download_link(pageUrl) {
        return new Promise((resolve, reject) => {
            axios.get(`${pageUrl.includes(`/${_platform}/download`) ? pageUrl : `${pageUrl}${pageUrl.endsWith('/') ? '' : '/'}download`}`).then(res => {
                resolve(parseDownload(res.data));
            }).catch(reject);
        })
    }
}
