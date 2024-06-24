const bcrypt = require('bcryptjs')


const hashService = {}
hashService.hash = (plainText) => bcrypt.hash(plainText,10)
hashService.compare = (plainText,hashValue) => bcrypt.compare(plainText,hashValue)

module.exports = hashService;