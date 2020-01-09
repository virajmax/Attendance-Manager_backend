const express = require("express");
const router = express.Router();
const user = require('../Logic/User')

router.post('/',(req,res)=>{

})

router.post('/register',(req,res)=>{
    user.registerUser(req,res);
})

module.exports = router;