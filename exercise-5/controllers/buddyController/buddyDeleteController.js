const buddyDeleteServices = require('../../services/buddyServices/buddyDeleteServices');

/**
 * @author Kamalesh A R
 * 
 * DELETE /buddy/deleteBuddy
 * @async
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {Express.Next} next
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
 *  message : Cannot find DB
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
const deleteBuddy = async (req,res,next) => {
    //check if the employeeId key is present
    if(req.body.employeeId !== null && req.body.employeeId !== undefined){
        req.body.employeeId = parseInt(req.body.employeeId);
        //create a request object suitable for logging errors and also contains the data
        const reqData = {
            url : req.originalUrl,
            method : req.method,
            ip : req.ip,
            body : req.body,
        };
        //await the response
        const response = await buddyDeleteServices.deleteBuddy(reqData);
        //check if the response is valid
        if(response.status == 200){
            res.status(response.status).json(response.data);
        }else{
            res.status(response.status).send(response.message);
        }
    }// if the key is not present then...
    else{
        res.status(404).send("Error! Don't send invalid inputs.");
    }
}
// exporting the controller.
module.exports = {deleteBuddy};