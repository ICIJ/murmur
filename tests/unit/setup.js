const util = require('util')
const exec = util.promisify(require('child_process').exec)

module.exports = async () => {
  // We build the lib to test it is well integrated
  // return exec('yarn run build:lib')
}
