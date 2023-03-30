const buddyGetServices = require('../../services/buddyServices/buddyGetServices');

// function is async calling a method with Promise.
const getAllBuddies = async (req,res,next) => {
    // response is awaited.
    res.json(await buddyGetServices.getAllBuddies());
}

// function is async calling a method with Promise.
const getBuddy = async (req,res,next) => {
    // response is awaited.
    res.json(await buddyGetServices.getBuddy(req.body));
}
// exporting the controllers.
module.exports = {
    getAllBuddies,
    getBuddy
}