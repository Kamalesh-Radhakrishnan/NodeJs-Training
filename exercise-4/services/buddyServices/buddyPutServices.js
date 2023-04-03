const readData = require('../../helper/readHelper');
const writeData = require('../../helper/writeHelper');
const {byId} = require('../../helper/isPresent');

//funtion is made async because the db file is read inside a promise.
const updateBuddy = async (body) => {
    let json = {
        status : 404,
    };
    let promise = readData('./assets/cdw_ace23_buddies.json');
    await promise.then(
        async (data) => {
            let buddies = JSON.parse(data);
            // finding the index of the requested id.
            let index = byId(buddies,body.id);
            //remove the unnecessary parameter.
            if(index !== -1){
                delete body.id;
                buddies[index] = body;
            }else{
                json.mesage = "Cannot find the requested Buddy."
                json.status = 500;
            }
            let writePromise = writeData('./assets/cdw_ace23_buddies.json',JSON.stringify(buddies));
            await writePromise.then(
                () => {
                    json.data = buddies;
                }
            ).catch(
                (err) => {
                    json.message = "Cannot write to DB.";
                    json.status = 404;
                }
            );
        }
    ).catch((err) => {
        json.message = "Cannot find DB";
    });

    // json data is returned.
    return json;
}

module.exports = {updateBuddy};