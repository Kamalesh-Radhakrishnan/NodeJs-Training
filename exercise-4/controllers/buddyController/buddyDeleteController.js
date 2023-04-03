const buddyDeleteServices = require('../../services/buddyServices/buddyDeleteServices');

// function is async calling a method with Promise.
const deleteBuddy = async (req,res,next) => {
    // response is awaited.
    if(req.body.employeeId !== null && req.body.employeeId !== undefined){
        req.body.employeeId = parseInt(req.body.employeeId);
        const response = await buddyDeleteServices.deleteBuddy(req.body);
        if(response.status == 200){
            res.status(response.status).json(response.data);
        }else{
            res.status(response.status).send(response.message);
        }
    }
    else{
        res.status(404).send("Error! Don't send invalid inputs.");
    }
}
// exporting the controller.
module.exports = {deleteBuddy};