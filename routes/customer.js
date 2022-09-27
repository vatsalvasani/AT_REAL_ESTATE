const express = require('express')
const router = express.Router()
const customerschema = require('../models/customersc')

router.get("/",async(req,res)=>
{
    try{
        const cust_obj = await customerschema.find()
        res.json(cust_obj)
    }
    catch(e){
        res.send(e);
    }
})

router.post("/",async(req,res)=>
{
    const cust_obj = new customerschema(
        {
            id : req.body.id,
            name : req.body.name,
            mobileno : req.body.mobileno,
            email : req.body.email,
            password : req.body.password,
            recovery : req.body.recovery
        })
        try{
            const a1 = await cust_obj.save()
            res.json(a1) 
        }catch(err)
        {
            res.send(err)
        }
})

router.put("/:id", (req, res) => 
{
    customerschema.findOneAndUpdate( {id: req.params.id}, req.body,{useFindAndModify: false}, function(err, result) 
    {
        if (err) 
        {
            return res.status(400).json({ error: err })
        }
        return res.status(200).json( { result } )          
    });			
});

router.delete("/:id", (req, res) => {
    customerschema.deleteOne({ id: req.params.id }, function(err, result) {
        if (err)
        {
            return res.status(400).json({ error: err }) 
        }
        return res.status(200).json({ result });
    });
});

router.post("/Login",(req,res)=>{
    const {email,password} =req.body;
    customerschema.findOne({email:email},(err,user)=>{
        if(user){
           if(password === user.password){
               res.send({message:"login success",user:user})
           }else{
               res.send({message:"wrong credentials"})
           }
        }else{
            res.send("not register")
        }
    });
});

router.post("/changepassword",(req,res)=>{
    const {recovery} =req.body;
    customerschema.findOne({recovery:recovery},(err,user)=>{
        if(user){
           if(recovery === user.recovery){
               res.send({message:"View Your Password And User Name",user:user})
           }else{
               res.send({message:"wrong credentials"})
           }
        }else{
            res.send("not register")
        }
    });
});



module.exports=router
