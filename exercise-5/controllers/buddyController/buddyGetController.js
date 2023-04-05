const buddyGetServices = require('../../services/buddyServices/buddyGetServices');

/**
 * @author Kamalesh A R
 * 
 * GET /buddy/getAllBuddies
 * @async
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {Express.Next} next
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
const getAllBuddies = async (req,res,next) => {
    // response is awaited.
    const response = await buddyGetServices.getAllBuddies();
    if(response.status == 200){
        res.status(200).json(response.data);
    }else{
        res.status(response.status).send(response.message);
    }
}

/**
 * @author Kamalesh A R
 * 
 * GET /buddy/getBuddyById or /buddy/getBuddyByRealName
 * @async
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {Express.Next} next
 *  
 * @description Gets the buddies information based on employeeId or realName.
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
 * @export function getBuddy
 * 
 */

const getBuddy = async (req,res,next) => {
    // response is awaited.
    let response;
    if(typeof(req.body.employeeId) === typeof('') || (req.body.employeeId !== null && req.body.employeeId !== undefined)) {
        req.body.employeeId = parseInt(req.body.employeeId);
        const reqData = {
            url : req.originalUrl,
            method : req.method,
            ip : req.ip,
            body : req.body,
        }
        response = await buddyGetServices.getBuddyById(reqData);
    }else if(typeof(req.body.realName) === typeof('') || (req.body.realName !== null && req.body.realName !== undefined)){
        const reqData = {
            url : req.originalUrl,
            method : req.method,
            ip : req.ip,
            body : req.body,
        }
        response = await buddyGetServices.getBuddyByRealName(reqData);
    }else{
        res.status(404).send("Invalid input.");
    }
    if(response.status == 200){
        res.status(response.status).json(response.data);
    }else{
        res.status(response.status).send(response.message);
    }
}
// exporting the controllers.
module.exports = {
    getAllBuddies,
    getBuddy
}