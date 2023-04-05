require('dotenv').config();
const readData = require('../../helper/readHelper');
const writeData = require('../../helper/writeHelper');
const {byId} = require('../../helper/isPresent');
const logger = require('../../logger');
const constantResponses = require('../../constantResponses');

/**
 * @author Kamalesh A R
 * 
 * DELETE /buddy/deleteBuddy
 * @async
 * 
 * @param {Object} reqData { Express.Request.ip,Express.Request.method,Express.Request.originalUrl,Express.Request.body }
 *  
 * @description delete the buddy by 'employeeId'
 * 
 * @returns {Buddy} buddy list (updated)
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
 * @export function deleteBuddy
 * 
 */
const deleteBuddy = async (reqData) => {
    let json = {
        status:404,
    };
    let promise = readData(process.env.DB_PATH);
    await promise.then(
        async (data) => {
            let buddies = JSON.parse(data);
            // finding the index and removing it using the splice method.
            let index = byId(buddies,reqData.body.employeeId);
            if(index != -1){
                buddies.splice(index,1);
                json.status = 200;
                json.message = constantResponses.deleteSuccess;
            }else{
                json.status = 400;
                json.message = constantResponses.noRecords;
            }
            let writePromise = writeData(process.env.DB_PATH,JSON.stringify(buddies));
            await writePromise.then(
                () => {
                    json.data = buddies;
                }).catch((err) => {
                    json.status = 404;
                    json.message = constantResponses.writeError;
                    logger.error(`${err.status || 404} - ${err.message} - ${reqData.url} - ${reqData.method} - ${reqData.ip}`);
                });
        },
        (err) => {
            json.message = constantResponses.readError;
            logger.error(`${err.status || 404} - ${err.message} - ${reqData.url} - ${reqData.method} - ${reqData.ip}`);
        }
    );
    return json;
}

module.exports = {deleteBuddy};