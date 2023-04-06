const buddyGetServices = require('../../services/buddyServices/buddyGetServices');

// function is async calling a method with Promise.
const getAllBuddies = async (req,res,next) => {
    // response is awaited.
    const response = await buddyGetServices.getAllBuddies();
    res.send(response.data);
}

// function is async calling a method with Promise.
const getBuddy = async (req,res,next) => {
    // response is awaited.
    let response;
    if(typeof(req.body.employeeId) === typeof('') || (req.body.employeeId !== null && req.body.employeeId !== undefined)) {
        req.body.employeeId = parseInt(req.body.employeeId);
        response = await buddyGetServices.getBuddyById(req.body);
    }else if(typeof(req.body.realName) === typeof('') || (req.body.realName !== null && req.body.realName !== undefined)){
        response = await buddyGetServices.getBuddyByRealName(req.body);
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