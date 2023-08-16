require('dotenv').config()
const user = require('../model/userModel');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const jws = require('jsonwebtoken')

router.post('/login', async (req,res) => {
    try {
        const userDB = await user.findOne({
            where:{
                email:req.body.email,
            }
        });
        if(!userDB){
            return res.json("No user");
        } else{
            try{
                if(await bcrypt.compare(req.body.password,userDB.password)){
                    const accessToken = jws.sign(userDB.username,process.env.token)
                    res.json({'user': userDB.username, 'token': accessToken});
                }else{
                    res.json('wrong password');
                }
            }catch{
                res.status(500).send()
            }
        }
    } catch(err){
        console.log(err);
    }
})

router.post('/register', async (req,res) =>{
    try{
        const hsdpassword = await bcrypt.hash(req.body.password,10) 
        await user.create({
            username:req.body.username,
            email:req.body.email,
            password:hsdpassword,
        });
        res.json(`user ${username} has bean created`);
    } catch(err){
        console.log(err);
    }
})

module.exports = router;