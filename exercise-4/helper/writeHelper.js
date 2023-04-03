const {writeFile} = require('fs').promises;

const writeData = async (url,data) => {
    return await writeFile(url,data);
}

module.exports = writeData;