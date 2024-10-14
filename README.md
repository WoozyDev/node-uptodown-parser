# uptodown.com parser
Made by @woozy666<br>
Programming Language: JavaScript<br>
Language: English<br>
Last Updated At: 10/14/2024<br>
<br>
This project was made in 1 hour
<br>
## Required Packages
```
npm install axios node-html-parser
```
## How To use
1. Clone this project or copy the code from parser.js into your existing project
2. If you copy the code and want to import it into ur main file and add this line into your code:
- JavaScript
```js
let parser = require('./parser');
```
- TypeScript
```ts
import parser from "./parser";
```
## Main Functions
```ts
// the calls after this, will use the platform you have set here.
usePlatform(platform: 'android' | 'windows' | 'mac')
```
```ts
autocomplete(query: string)
```
```ts
search(query: string)
```
```ts
get_game(page: string)
```
```ts
// page: the same url you use for get_game() function
get_download_link(page: string)
```
## Example Code
You can view the `example.js` file if you want to know what results the functions gives you.
## Credits
If you want to use this, make sure to leave me a credit.