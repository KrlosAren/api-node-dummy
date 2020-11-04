const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  date : {
    type: Date,
    default: Date.now
  }
})


userSchema.pre('save', function (next) {
  const user = this
  if (!user.isModified('password')) {
    return next()
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      next(err)
    }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) {
        next(err)
      }
      user.password = hash
      next()
    })
  })
})

userSchema.method.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isEqual) => {
    if(err) {
      return cb(err)
    }
    cb(null, isEqual)
  })
}

module.exports = mongoose.model('User', userSchema)