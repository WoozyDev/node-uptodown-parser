let parser = require('./parser');

// Search a game on uptodown.com:
parser.search('Critical Ops').then(games => {
    console.log(games);
    /* Example Result
    [
        {
            "platform": "android",
            img: 'https://img.utdstc.com/icon/234/b03/234b03d17f93215c9c2d278fd20e6d3f93919fa95f8e5f122765de458bf8d238',
            page: 'https://critical-ops.en.uptodown.com/android',
            title: 'Critical Ops',
            desc: 'Multiplayer combat in an amazing shooter'
        },
        {
            "platform": "android",
            img: 'https://img.utdstc.com/icon/278/480/2784802784916f764cac048b9bcbb92f8c898ccaf28f20c7818f1547e8c400d3',
            page: 'https://delta-force-hawk-ops-cn.en.uptodown.com/android',
            title: 'Delta Force: Hawk Ops (CN)',
            desc: 'Spectacular online shooter with missions, combat and much more'
        },
        ...
    ]
    */
})

// Parse the game's page (you can use the url from the result's "page"):
parser.get_game('https://critical-ops.en.uptodown.com/android').then(game => {
    console.log(game);
    /* Example Result
    {
        "platform": "android",
        title: 'Critical Ops',
        version: '1.46.1.f2735',
        description: 'Multiplayer combat in an amazing shooter',
        gallery: [
            'https://img.utdstc.com/videos/gz4JpbUx2fY.jpg',
            'https://img.utdstc.com/screen/bf9/43c/bf943cca26a44e039829f2ba91301a7068ddd12b6c6451ad6c72c481a1a9aba9',
            ...
        ],
        faqs: [
            {
                question: 'Can I play Critical Ops on my PC?',
                answer: 'You can download Critical Ops on your PC from Uptodown. After downloading the APK, you can run it on your PC with an emulator, such as NoxPlayer, LDPlayer, or BlueStacks. All of them are available for download on Uptodown.'
            },
            ...
        ],
        info: {
            packageName: 'com.criticalforceentertainment.criticalops',
            license: 'Free',
            category: 'Action/Adventure',
            author: 'Critical Force Ltd.',
            date: 'Sep 19, 2024',
            advertisment: 'Not specified',
            system: 'Android',
            language: 'English',
            downloads: '3,847,067',
            contentRating: '+16'
        },
        olderVersions: [
            {
                apkType: 'xapk',
                oldVersion: '1.46.0.f2719',
                androidVersion: 'Android + 6.0',
                versionDate: 'Aug 29, 2024'
            },
            {
                apkType: 'xapk',
                oldVersion: '1.46.0.f2701',
                androidVersion: 'Android + 6.0',
                versionDate: 'Aug 16, 2024'
            },
            ...
            { url: 'https://critical-ops.en.uptodown.com/android/versions' }
        ]
    }
    */
})

// Use autocomplete and get results on uptodown.com:
parser.autocomplete('Criti').then(results => {
    console.log(results);
    /* Example Result
    [
        {
            name: 'Critical Ops',
            url: 'https://critical-ops.en.uptodown.com/android',
            platformURL: '/android'
        },
        {
            name: 'Critical Strike Portable',
            url: 'https://critical-strike-portable.en.uptodown.com/android',
            platformURL: '/android'
        },
        ...
    ]
    */
})

// Use this to get the download link of the game (you can use the url from the result's "page"):
parser.get_download_link('https://critical-ops.en.uptodown.com/android').then(link => {
    console.log(link);
    /* Example Result
    {
        "platform": "android",
        "url": "https://dw.uptodown.com/dwn/z6o5afG7BoJhGISxkSCY3sqSf6Pw5mtRYWlo5M09r0o1yVwDrTlCC_-_DV2I2mRzMNAhp9V4OskNLAsspZXfz5sWtr9Lzjh1dmLVDwyvesG6A71KboVNsF78_31bd15g/U7YiWfcn8e57D_dJKtv-WrO028ovAFvZA7CGwBFfXHg0Az_uOzY7W2KcO_0xzVO_s3rJZk8Zt0p3rN3xtnBmYAFV8wfHCPNPIpaPs3m6rpyTs4ClYYmt_nDl-tsbwdvC/KhcofsnF6lWx3MqdxSAFUA0mkBmorYVGruXN3T2ZG-HiEPci0npE8q4Non8qali4eLAl4qBeTrdm6zlR9o73yyQ5ELT2E2ssNCTxcHErcKkJeHk7yzUUC6R37N_1X-BI/uxabV8ORd-riyprcGkchNQ==/"
    }*/
});


// **USING usePlatform**
// Use autocomplete and get results on uptodown.com:
parser.usePlatform('windows').autocomplete('Criti').then(results => {
    console.log(results);
    /* Example Result
    [
        {
            name: 'Critical Mass',
            url: 'https://critical-mass.en.uptodown.com/windows',
            platformURL: '/windows'
        },
        {
            name: 'Critical Annihilation',
            url: 'https://critical-annihilation.en.uptodown.com/windows',
            platformURL: '/windows'
        }
    ]
    */
})

parser.usePlatform('mac').autocomplete('Mozilla Firefox').then(results => {
    console.log(results);
    /* Example Result
    [
        {
            name: 'Mozilla Firefox',
            url: 'https://firefox.en.uptodown.com/mac',
            platformURL: '/mac'
        },
        {
            name: 'Mozilla Firefox Beta',
            url: 'https://mozilla-firefox-beta.en.uptodown.com/mac',
            platformURL: '/mac'
        }
    ]
    */
})