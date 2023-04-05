// importing methods using object destructuring way
const { readFile,writeFile } = require('fs');
const promisify = require('util').promisify;

//converting the readFile function from returning a callback to returning a Promise.
const read = promisify(readFile);

const write = promisify(writeFile);

//then() is separated into a function...
const fetchColorsAndWrite = (data) => {
    // on reading data...
    if(data !== null && data !== undefined) {
        let colorPalette = JSON.parse(data.toString());
        //the logic can also be converted to length >= 5
        // following logic does the functionality if the size is greater than 0
        if(colorPalette.length > 0){ 
            let arr = [];
            for(let i = 0;i < 5;i++){
                arr.push(colorPalette[Math.floor(Math.random() * colorPalette.length)]);
            }
            write('./assets/color.json',JSON.stringify(arr)).then(() => {
                //only on successful write the read function will be called.
                read('./assets/color.json','UTF-8').then(data => fetchAndDisplay(data)).catch(err => executeOnError(err));
            }).catch(err => executeOnError(err));
        }else{
            console.log('no colors found in colors_palette.json');// console statement can also be written in the file.
        }
    }// if the fetched data is null or undefined
    else{
        console.log('feetched data is null or undefined');
    }
};

const fetchAndDisplay = (data) => {
    // on reading data...
    let color = JSON.parse(data);
    console.log(color);
}

//catch() is separated into a function...
const executeOnError = (err) => {
    //incase of any errors...
    console.log(err);
}

//passing the file location and other paramaters of readFile to the converted version of readFile ie., read()
read('./assets/color_palette.json','UTF-8').then(data => fetchColorsAndWrite(data)).catch(err => executeOnError(err));
    