require('dotenv').config();
const readData = require('../../helper/readHelper');
const {byId,byRealName} = require('../../helper/isPresent');
const logger = require('../../logger');
const constantResponses = require('../../constantResponses');

/**
 * @author Kamalesh A R
 * 
 * GET /buddy/getAllBuddies
 * @async
 * 
 * @param {Object} reqData { Express.Request.ip,Express.Request.method,Express.Request.originalUrl,Express.Request.body }
 *  
 * @description Gets all the buddies information 
 * 
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
 *  message : Cannot find DB
 * }
 * 
 * @export function getAllBuddies
 * 
 */
const getAllBuddies = async (reqData) => {
    let json = {
        status: 404,
    };
    let promise = readData(process.env.DB_PATH);
    // promise.then() is made await because the Promise has to send either the err reject ir resolve notification.
    await promise.then(
        // function to be triggered on resolve notification.
        (data) => {
            if(data.length != 0){
                json.status = 200;
                json.message = constantResponses.getSuccess;
                json.data = data;
            }else{
                json.status = 400;
                json.message = constantResponses.noRecords;
            } 
        },
        // function to be triggered on reject notification.
        (err) => {
            json.status = 404;
            json.message = constantResponses.readError;
            logger.error(`${err.status} - ${err.message} - ${reqData.url} - ${reqData.method} - ${reqData.ip}`);
        }
    );
    // json data is returned.
    return json;
}

/**
 * @author Kamalesh A R
 * 
 * GET /buddy/getBuddyById
 * @async
 * 
 * @param {Object} reqData { Express.Request.ip,Express.Request.method,Express.Request.originalUrl,Express.Request.body }
 *  
 * @description Gets the buddy information based on employeeId or realName.
 * 
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
 *  message : Cannot find DB
 * }
 * 
 * Status 500 :
 * {
 *  status : 500
 *  message: "Cannot find the requested buddy"
 * }
 * 
 * @export function getBuddyById
 * 
 */
const getBuddyById = async (reqData) => {
    let json = {
        status : 404,
    };
    let promise = readData(process.env.DB_PATH);
    // promise.then() is made await because the Promise has to send either the err reject ir resolve notification.
    await promise.then(
        // function to be triggered on resolve notification.
        (data) => {
            let buddies = JSON.parse(data);
            let index;
            index = byId(buddies,reqData.body.employeeId)
            if(index != -1){
                json.status = 200;
                json.message = constantResponses.getSuccess;
                json.data = buddies[index];
            }else{
                json.status = 400;
                json.message = constantResponses.getSuccess;
            }
        },
        // function to be triggered on reject notification.
        (err) => {
            json.message = constantResponses.readError;
            logger.error(`${err.status || 404} - ${err.message} - ${reqData.url} - ${reqData.method} - ${reqData.ip}`);
        }
    );
    // json data is returned.
    return json;
}

/**
 * @author Kamalesh A R
 * 
 * GET /buddy/getBuddyByRealName
 * @async
 * 
 * @param {Object} reqData { Express.Request.ip,Express.Request.method,Express.Request.originalUrl,Express.Request.body }
 *  
 * @description Gets the buddy information based on realName.
 * 
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
 *  message : Cannot find DB
 * }
 * 
 * Status 500 :
 * {
 *  status : 500
 *  message: "Cannot find the requested buddy"
 * }
 * 
 * @export function getBuddyByRealName
 * 
 */

const getBuddyByRealName = async(reqData) => {
    let json = {
        status : 404,
    };
    let promise = readData(process.env.DB_PATH);
    await promise.then(
        (data) => {
            let buddies = JSON.parse(data);
            let index = byRealName(buddies,reqData.body.realName);
            if(index != -1){
                json.status = 200;
                json.messgae = constantResponses.getSuccess;
                json.data = buddies[index];
            }else{
                json.status = 400;
                json.message = constantResponses.noRecords;
            }
        },
        (err) => {
            json.message = constantResponses.readError;
            logger.error(`${err.status || 404} - ${err.message} - ${reqData.url} - ${reqData.method} - ${reqData.ip}`);
        }
    );
    return json;
}

module.exports = {
    getAllBuddies,
    getBuddyById,
    getBuddyByRealName
};