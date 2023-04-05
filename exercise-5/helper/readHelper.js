const {readFile} = require('fs').promises;

const readData = async (url) => {
    return await readFile(url,'UTF-8');
}

module.exports = readData;