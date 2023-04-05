/**
 * @author Kamalesh A R
 * @param {Array} buddies 
 * @param {Number} id 
 * @description checks if the requested id exists in the array
 * @returns {Number} index of buddy in buddies array
 */
const byId = (buddies,id) => {
    let index = buddies.findIndex(buddy => buddy.employeeId == id);
    return index;
};

/**
 * @author Kamalesh A R
 * @param {Array} buddies 
 * @param {String} realName
 * @description checks if the requested realName exists in the array
 * @returns {Number} index of buddy in buddies array
 */

const byRealName = (buddies,realName) => {
    let index = buddies.findIndex(buddy => buddy.realName == realName);
    return index;
};

module.exports = {
    byId,
    byRealName,
};