const buddyPutServices = require('../../services/buddyServices/buddyPutServices');

/**
 * @author Kamalesh A R
 * 
 * GET /buddy/updateBuddy
 * @async
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {Express.Next} next
 *  
 * @description Updates the buddy information based on key employeeId.
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
 * @export function updateBuddy
 * 
 */
const updateBuddy = async (req,res,next) => {

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
            const response = await buddyPutServices.updateBuddy(reqData);
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
module.exports = {updateBuddy};