const express = require('express');

const { getTwitterFollowers} = require('../controllers/twitterController'); 

const router = express.Router();

router.get('/get-twitter-followers',(req,res)=>{
  getTwitterFollowers()
  .then(data =>{
    res.send(data);
  })
  .catch(error =>{
    res.send(error);
  })
})

module.exports = router;