const buddyPutServices = require('../../services/buddyServices/buddyPutServices');

// function is async calling a method with Promise.
const updateBuddy = async (req,res,next) => {
    // response is awaited.
    const response = await buddyPutServices.updateBuddy(req.body);
    if(response.status == 200){
        res.status(response.status).json(response.data);
    }else{
        res.status(response.status).send(response.message);
    }
}
// exporting the controller.
module.exports = {updateBuddy};