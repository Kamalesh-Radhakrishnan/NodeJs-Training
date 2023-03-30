const {readFile} = require('fs');

//funtion is made async because the db file is read inside a promise.
const getAllBuddies = async () => {
    let json;
    // Promise object is created and the logic is run inside an anonymous function.
    let promise = new Promise((resolve,reject) => {
        // read the file and send all the data as response.
        readFile('./assets/cdw_ace23_buddies.json','UTF-8', (err,data) => {
            if(err){
                // promise is rejected incase of any error.
                //calls the reject anonymous function inside the promise.then() with the err object.
                reject(err);
            }else{
                //promise state is fullfilled in case successful retrival of data.
                //calls the resolve anonymous function inside the promise.then() with the err object.
                resolve(data);
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
    return JSON.parse(json);
}

//funtion is made async because the db file is read inside a promise.
const getBuddy = async (body) => {
    let json;
    // Promise object is created and the logic is run inside an anonymous function.
    let promise = new Promise((resolve,reject) => {
        // read the file 
        readFile('./assets/cdw_ace23_buddies.json','UTF-8',(err,data) => {
            if(err){
                // incase of file not found.
                reject(err);
            }else{
                let buddies = JSON.parse(data);
                let index,dataObj;
                // incase of user gives realName as search field
                if(typeof(body.employeeId) != typeof('')){
                    // find the index using findIndex.
                    index = buddies.findIndex(buddy => buddy.realName === body.realName);
                    dataObj = buddies[index];
                }
                // incase of user gives employeeId as search field
                else if(typeof(body.realName) != typeof('')){
                    // find the index using findIndex & pop sing splice.
                    index = buddies.findIndex(buddy => buddy.employeeId === body.employeeId);
                    dataObj = buddies[index];
                }
                resolve(dataObj);
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

module.exports = {
    getAllBuddies,
    getBuddy,
};