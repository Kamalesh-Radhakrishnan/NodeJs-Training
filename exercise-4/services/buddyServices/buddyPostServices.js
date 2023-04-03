const readData = require('../../helper/readHelper');
const writeData = require('../../helper/writeHelper');

//funtion is made async because the db file is read inside a promise.
const addBuddy = async (body) => {
    let json = {
        status:404,
    };
    let promise = readData('./assets/cdw_ace23_buddies.json');
    await promise.then(async (data) => {
        let buddies = JSON.parse(data);
        buddies.push(body);
        let writePromise = writeData('./assets/cdw_ace23_buddies.json',JSON.stringify(buddies));
        await writePromise.then(()=>{
            json.status = 200;
            json.message = "Written Successfully.";
            json.data = buddies;
        }).catch((err)=>{
            json.message = "Cannot write to DB."
        });
        
    }).catch((err) => {
        json.message = "Cannot find DB.";
    });
    // json data is returned.
    return json;
}

module.exports = {addBuddy};