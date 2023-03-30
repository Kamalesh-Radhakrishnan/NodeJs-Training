const buddyPutServices = require('../../services/buddyServices/buddyPutServices');

// function is async calling a method with Promise.
const updateBuddy = async (req,res,next) => {
    // response is awaited.
    res.json(await buddyPutServices.updateBuddy(req.body));
}
// exporting the controller.
module.exports = {updateBuddy};