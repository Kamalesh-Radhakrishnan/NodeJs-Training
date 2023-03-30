const buddyPostServices = require('../../services/buddyServices/buddyPostServices');

// function is async calling a method with Promise.
const addBuddy = async(req,res,next) => {
    // response is awaited.
    res.json(await buddyPostServices.addBuddy(req.body));
}
// exporting the controller.
module.exports = {addBuddy};