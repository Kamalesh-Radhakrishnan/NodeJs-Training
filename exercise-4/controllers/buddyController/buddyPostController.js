const buddyPostServices = require('../../services/buddyServices/buddyPostServices');

// function is async calling a method with Promise.
const addBuddy = async(req,res,next) => {
    // response is awaited.
    const response = await buddyPostServices.addBuddy(req.body);
    if(response.status == 200){
        res.status(response.status).json(response.data);
    }else{
        res.status(response.status).send(response.message);
    }
}
// exporting the controller.
module.exports = {addBuddy};