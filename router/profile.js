require('dotenv').config()
const express = require('express');
const router = express.Router();
const jws = require('jsonwebtoken')

function authToken(req,res,next){
    const authHead = req.headers['authorization']
    const token = authHead && authHead.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jws.verify(token,process.env.token, (err,user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

router.get('/profile', authToken,async (req,res) =>{
    res.json(req.user);
})


module.exports = router;