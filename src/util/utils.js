const bcrypt = require('bcrypt')
const helpers = {}

helpers.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  const passwordEncrypt = await bcrypt.hash(password, salt)
  return passwordEncrypt
}

helpers.matchPassword = async (password, DBPassword) => {
  try {
    return await bcrypt.compare(password, DBPassword)
  } catch (error) {
    console.error(error);
  }
}

module.exports = helpers