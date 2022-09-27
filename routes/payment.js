const express =require('express')
const router = express.Router()
const paymentschema = require('../models/paymentsc')

router.get("/",async(req,res)=>
{
    try{
        const pay_obj = await paymentschema.find()
        res.json(pay_obj)
    }
    catch(e)
    {
        res.send(e);
    }
})

router.post("/",async(req,res)=>
{
    const pay_obj =new paymentschema(
        {
            paymentid : req.body.paymentid,
            propertyid : req.body.propertyid,
            buyer_name : req.body.buyer_name,
            b_mobileno : req.body.b_mobileno,
            seller_name : req.body.seller_name,
            s_mobileno : req.body.s_mobileno,
            price : req.body.price,
        })
    try{
       const a1 =await pay_obj.save()
       res.json(a1)
    }
    catch(e)
    {
        res.send(e);
    }
})


router.put("/:id", (req, res) => {
    paymentschema.findOneAndUpdate( {id: req.params.id},req.body,{useFindAndModify: false},  function(err, result) {
        if (err) 
            return res.status(400).json({ error: err })
        return res.status(200).json( { result } )
    });			
});

router.delete("/:id", (req, res) => {
    paymentschema.deleteOne({ id: req.params.id }, function(err, result) {
        if (err)
            return res.status(400).json({ error: err }) 
        return res.status(200).json({ result });
    });
});

module.exports =router
