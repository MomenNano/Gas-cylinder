const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const router = express.Router()
const Ajv = require('ajv')

const ajv = new Ajv()

const validationSchema = {
  type: 'object',
  required: ['name','homeNum', 'gasNum', 'gasType'],
  properties: {
    name: { type: 'string' },
    homeNum: { type: 'number' },
    gasNum: { type: 'number' },
    gasType: { type: 'string' },
  }
}

const validate = ajv.compile(validationSchema)

const Request = require('../dbModels/Request')

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  res.sendFile(path.join(__dirname, '../public/home.html'))
})

router.post('/submit', function (req, res, next) {
  try {
    let { name, homeNum, gasNum, gasType } = req.body
    homeNum = Number(homeNum)
    gasNum = Number(gasNum)
    console.log(req.body)
    const isValid = validate({name, homeNum, gasNum, gasType})

  if (!isValid) {
    console.log(validate.errors)
    res.send('املأ كل البيانات')
    return
  }

  
    const request = new Request({
      _id: new mongoose.Types.ObjectId(),
      name: name,
      homeNum: homeNum,
      GasNum: gasNum,
      GasType: gasType
    })
  
    const result = request.save()  
    res.sendFile(path.join(__dirname, '../public/done.html'))
  } catch (error) {
    res.send('error')
  }
})

module.exports = router
