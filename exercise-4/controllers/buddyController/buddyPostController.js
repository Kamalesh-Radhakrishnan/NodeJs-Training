const buddyPostServices = require('../../services/buddyServices/buddyPostServices');

// function is async calling a method with Promise.
const addBuddy = async(req,res,next) => {
    // response is awaited.
    if(req.body !== null || req.body !== undefined){
        if(req.body.employeeId !== undefined && req.body.employeeId !== null && req.body.realName !== undefined && req.body.realName !== null && req.body.nickName !== undefined && req.body.nickName !== null && req.body.dob !== undefined && req.body.dob !== null && req.body.hobbies !== undefined && req.body.hobbies !== null){ 
            const response = await buddyPostServices.addBuddy(req.body);
            if(response.status == 200){
                res.status(response.status).json(response.data);
            }else{
                res.status(response.status).send(response.message);
            }
        }else{
            res.status(404).send("Invalid parameters and values passed.");
        }
    }else{
        res.status(404).send("Cannot send null or undefined body.");
    }
}
// exporting the controller.
module.exports = {addBuddy};
