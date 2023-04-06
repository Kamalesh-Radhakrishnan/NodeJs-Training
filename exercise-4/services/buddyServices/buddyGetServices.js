const readData = require('../../helper/readHelper');
const {byId,byRealName} = require('../../helper/isPresent');


//funtion is made async because the db file is read inside a promise.
const getAllBuddies = async () => {
    let json = {
        status: 404,
    };
    let promise = readData('./assets/cdw_ace23_buddies.json');
    // promise.then() is made await because the Promise has to send either the err reject ir resolve notification.
    await promise.then(
        // function to be triggered on resolve notification.
        (data) => {
            if(data.length != 0){
                json.status = 200;
                json.message = "Fetch successful."
                json.data = data;
            }else{
                json.status = 500;
                json.message = "No records found!";
            } 
        },
        // function to be triggered on reject notification.
        (err) => {
            json.status = 404;
            json.message = "DB not found"
            console.log(err);
        }
    );
    // json data is returned.
    return json;
}

//funtion is made async because the db file is read inside a promise.
const getBuddyById = async (body) => {
    let json = {
        status : 404,
    };
    let promise = readData('./assets/cdw_ace23_buddies.json');
    // promise.then() is made await because the Promise has to send either the err reject ir resolve notification.
    await promise.then(
        // function to be triggered on resolve notification.
        (data) => {
            let buddies = JSON.parse(data);
            let index;
            index = byId(buddies,body.employeeId)
            if(index != -1){
                json.status = 200;
                json.message = "Requested object found!";
                json.data = buddies[index];
            }else{
                json.status = 500;
                json.message = "Requested object not found!";
            }
        },
        // function to be triggered on reject notification.
        (err) => {
            json.message = "Db not found";
            console.log(err);
        }
    );
    // json data is returned.
    return json;
}

const getBuddyByRealName = async(body) => {
    let json = {
        status : 404,
    };
    let promise = readData('./assets/cdw_ace23_buddies.json');
    await promise.then(
        (data) => {
            let buddies = JSON.parse(data);
            let index = byRealName(buddies,body.realName);
            if(index != -1){
                json.status = 200;
                json.messgae = "Requested object found!";
                json.data = buddies[index];
            }else{
                json.status = 500;
                json.message = "Requested object not found!";
            }
        },
        (err) => {
            json.message = "DB not found!";
            console.log(err); 
        }
    );
    return json;
}

module.exports = {
    getAllBuddies,
    getBuddyById,
    getBuddyByRealName
};