const readData = require('../../helper/readHelper');
const writeData = require('../../helper/writeHelper');
const {byId} = require('../../helper/isPresent');

//funtion is made async because the db file is read inside a promise.
const deleteBuddy = async (body) => {
    let json = {
        status:404,
    };
    let promise = readData('./assets/cdw_ace23_buddies.json');
    await promise.then(
        async (data) => {
            let buddies = JSON.parse(data);
            // finding the index and removing it using the splice method.
            let index = byId(buddies,body.employeeId);
            if(index != -1){
                buddies.splice(index,1);
                json.status = 200;
                json.message = "Element deleted!";
            }else{
                json.status = 500;
                json.message = "Requested Element not found!";
            }
            let writePromise = writeData('./assets/cdw_ace23_buddies.json',JSON.stringify(buddies));
            await writePromise.then(
                () => {
                    json.data = buddies;
                }).catch((err) => {
                    json.status = 404;
                    json.message = "Couldn't write it back to DB. Path error!";
                });
        },
        (err) => {
            json.message = "Database not found.!";
        }
    );
    return json;
}

module.exports = {deleteBuddy};