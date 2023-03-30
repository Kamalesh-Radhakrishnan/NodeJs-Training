const buddyDeleteServices = require('../../services/buddyServices/buddyDeleteServices');

// function is async calling a method with Promise.
const deleteBuddy = async (req,res,next) => {
    // response is awaited.
    res.json(await buddyDeleteServices.deleteBuddy(req.body));
}
// exporting the controller.
module.exports = {deleteBuddy};