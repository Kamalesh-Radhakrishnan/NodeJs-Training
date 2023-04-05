require('dotenv').config();
const readData = require('../../helper/readHelper');
const writeData = require('../../helper/writeHelper');
const {byId,byRealName} = require('../../helper/isPresent');
const logger = require('../../logger');
const constantResponses = require('../../constantResponses');

/**
 * @author Kamalesh A R
 * 
 * POST /buddy/addBuddy
 * @async
 * 
 * @param {Object} reqData { Express.Request.ip,Express.Request.method,Express.Request.originalUrl,Express.Request.body }
 *  
 * @description Inserts the buddy into DB.
 * 
 * @returns {Buddy} buddy-list (updated)
 * 
 * Status 200 :
 * {
 *  status : 200
 *  message : "Successfully added buddy"
 *  data: {Buddy}
 * }
 * 
 * Status 404 :
 * {
 *  status : 404
 *  message : Cannot find DB
 * }
 * 
 * @export function addBuddy
 * 
 */
const addBuddy = async (reqData) => {
    let json = {
        status:404,
    };
    let promise = readData(process.env.DB_PATH);
    await promise.then(async (data) => {
        let buddies = JSON.parse(data);
        if((byId(buddies,reqData.body.employeeId) == -1) && (byRealName(buddies,reqData.body.realName) == -1)){
            buddies.push(reqData.body);
            let writePromise = writeData(process.env.DB_PATH,JSON.stringify(buddies));
            await writePromise.then(()=>{
                json.status = 200;
                json.message = constantResponses.writeSuccess;
                json.data = buddies;
            }).catch((err)=>{
                json.message = constantResponses.writeError;
                logger.error(`${err.status || 404} - ${err.message} - ${reqData.url} - ${reqData.method} - ${reqData.ip}`);
            });
        }else{
            json.status = 400,
            json.message = constantResponses.alreadyExists;
            logger.error(`${json.status} - ${json.message} - ${reqData.url} - ${reqData.method} - ${reqData.ip}`);
        }
    }).catch((err) => {
        json.message = constantResponses.alreadyExists;
        logger.error(`${err.status || 404} - ${err.message} - ${reqData.url} - ${reqData.method} - ${reqData.ip}`);
    });
    // json data is returned.
    return json;
}

module.exports = {addBuddy};