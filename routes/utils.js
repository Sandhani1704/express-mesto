const fsPromises = require('fs').promises;

const readFiles = (pathUrl) => fsPromises.readFile(pathUrl, { encoding: 'utf8' })
  .then((file) => JSON.parse(file));

module.exports = readFiles;
