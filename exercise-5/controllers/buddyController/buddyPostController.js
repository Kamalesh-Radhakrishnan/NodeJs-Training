const buddyPostServices = require('../../services/buddyServices/buddyPostServices');

/**
 * @author Kamalesh A R
 * 
 * POST /buddy/addBuddy
 * @async
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {Express.Next} next
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
const addBuddy = async(req,res,next) => {
    
    //check if req.body is present (not null or undefined)
    if(req.body !== null || req.body !== undefined){
        if(req.body.employeeId !== undefined && req.body.employeeId !== null 
            && req.body.realName !== undefined && req.body.realName !== null 
            && req.body.nickName !== undefined && req.body.nickName !== null 
            && req.body.dob !== undefined && req.body.dob !== null 
            && req.body.hobbies !== undefined && req.body.hobbies !== null){ 

            //create a request object suitable for logging errors and also contains the data
            const reqData = {
                url : req.originalUrl,
                method : req.method,
                ip : req.ip,
                body : req.body,
            }
            //await the response
            const response = await buddyPostServices.addBuddy(reqData);
            //check if the response is valid
            if(response.status == 200){
                res.status(response.status).json(response.data);
            }else{
                res.status(response.status).send(response.message);
            }
        }// missing parameters...
        else{
            res.status(404).send("Invalid parameters and values passed.");
        }
    }// Incase of null or undefined req.body...
    else{
        res.status(404).send("Cannot send null or undefined body.");
    }
}
// exporting the controller.
module.exports = {addBuddy};