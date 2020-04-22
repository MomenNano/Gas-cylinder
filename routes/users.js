const express = require('express');
const path = require('path')
const router = express.Router();

const Reqest = require('../dbModels/Request')

/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log('here')
  res.sendFile(path.join(__dirname, '../public/dashboard.html'))
});

router.get('/getData', async function(req, res, next){
  const data = await Reqest.find()
  res.json(data);

})

module.exports = router;
