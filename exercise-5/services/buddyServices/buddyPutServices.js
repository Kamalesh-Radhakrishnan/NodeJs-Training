require('dotenv').config();

const readData = require('../../helper/readHelper');
const writeData = require('../../helper/writeHelper');
const {byId} = require('../../helper/isPresent');
const constantResponses = require('../../constantResponses');
const logger = require('../../logger');

/**
 * @author Kamalesh A R
 * 
 * GET /buddy/updateBuddy
 * @async
 * 
 * @param {Object} reqData { Express.Request.ip,Express.Request.method,Express.Request.originalUrl,Express.Request.body }
 * @description Updates the buddy information based on key employeeId.
 * @returns {Buddy} buddy
 * 
 * Status 200 :
 * {
 *  status : 200
 *  message : "Fetch Successfull"
 *  data: {Buddy}
 * }
 * 
 * Status 404 :
 * {
 *  status : 404
 *  message : "Cannot find DB"
 * }
 * 
 * Status 500 :
 * {
 *  status : 500
 *  message: "Cannot find the requested buddy"
 * }
 * 
 * @export function updateBuddy
 * 
 */
const updateBuddy = async (reqData) => {
    let json = {
        status : 404,
    };
    let promise = readData(process.env.DB_PATH);
    await promise.then(
        async (data) => {
            let buddies = JSON.parse(data);
            // finding the index of the requested id.
            let index = byId(buddies,reqData.body.id);
            //remove the unnecessary parameter.
            if(index !== -1){
                delete reqData.body.id;
                buddies[index] = reqData.body;
            }else{
                json.mesage = constantResponses.noRecords;
                json.status = 400;
            }
            let writePromise = writeData(process.env.DB_PATH,JSON.stringify(buddies));
            await writePromise.then(() => {
                    json.status = 200;
                    json.message = constantResponses.updateSuccess;
                    json.data = buddies;
                }).catch(
                    (err) => {
                        json.message = constantResponses.writeError;
                        json.status = 404;
                        logger.error(`${err.status || 404} - ${err.message} - ${reqData.url} - ${reqData.method} - ${reqData.ip}`);
                    }
                );
        }
    ).catch((err) => {
        json.message = constantResponses.readError;
        logger.error(`${err.status || 404} - ${err.message} - ${reqData.url} - ${reqData.method} - ${reqData.ip}`);
    });

    // json data is returned.
    return json;
}

module.exports = {updateBuddy};