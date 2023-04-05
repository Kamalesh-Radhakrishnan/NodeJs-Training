// importing methods using object destructuring way
const { readFile } = require('fs');
const promisify = require('util').promisify;
const {createServer} = require('http');
const {randomSplice} = require('random-splice');

//converting the readFile function from returning a callback to returning a Promise.
const read = promisify(readFile);

//then() is separated into a function...
const fetchColorsAndWrite = (res,data) => {
    // on reading data...
    let colorPalette = JSON.parse(data.toString());
    let arr = [];
    for(let i = 0;i < 5;i++){
        //randomSplice 
        arr.push(randomSplice(colorPalette));
    }
    arr = JSON.stringify(arr);
    res.write(arr);
    res.end();
};

//catch() is separated into a function...
const executeOnError = (err) => {
    //incase of any errors...
    console.log(err);
}

//creating a server...
createServer((req,res) => {
    if(req.url != '/favicon.ico'){
        //passing the file location and other paramaters of readFile to the converted version of readFile ie., read()
        read('./assets/color_palette.json','UTF-8').then(data => fetchColorsAndWrite(res,data)).catch(err => executeOnError(err));
    }
}).listen(8080); // listen to the server at port 8080...