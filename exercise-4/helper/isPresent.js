const byId = (buddies,id) => {
    let index = buddies.findIndex(buddy => buddy.employeeId == id);
    return index;
};

const byRealName = (buddies,realName) => {
    let index = buddies.findIndex(buddy => buddy.realName == realName);
    return index;
};

module.exports = {
    byId,
    byRealName,
};