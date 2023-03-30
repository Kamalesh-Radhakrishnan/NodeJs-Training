const {readFile,writeFile} = require('fs');

//funtion is made async because the db file is read inside a promise.
const deleteBuddy = async (body) => {
    let json;
    // Promise object is created and the logic is run inside an anonymous function.
    let promise = new Promise((resolve,reject) => {
        readFile('./assets/cdw_ace23_buddies.json','UTF-8',(err,data) => {
            if(err){
                // incase of file not found.
                console.log(err);
            }else{
                let buddies = JSON.parse(data);
                // finding the index and removing it using the splice method.
                let index = buddies.findIndex(buddy => buddy.employeeId === body.employeeId);
                buddies.splice(index,1);
                //the updated list is written on the file again.
                writeFile('./assets/cdw_ace23_buddies.json',JSON.stringify(buddies),(err) => {
                    if(err){
                        // promise is rejected incase of any error.
                        //calls the reject anonymous function inside the promise.then() with the err object.
                        reject(err);
                    }else{
                        //promise state is fullfilled in case successful retrival of data.
                        //calls the resolve anonymous function inside the promise.then() with the err object.
                        resolve(buddies);
                    }
                });
            }
        });
    });
    // promise.then() is made await because the Promise has to send either the err reject ir resolve notification.
    await promise.then(
        // function to be triggered on resolve notification.
        (data) => {
            json = data;
        },
        // function to be triggered on reject notification.
        (err) => {
            console.log(err);
        }
    );
    // json data is returned.
    return json;
}

module.exports = {deleteBuddy};