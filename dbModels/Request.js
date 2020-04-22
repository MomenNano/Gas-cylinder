const mongoose = require('mongoose')

const RequestSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  homeNum: Number,
  GasNum: Number,
  GasType: String,
})

module.exports = mongoose.model('Request', RequestSchema)
