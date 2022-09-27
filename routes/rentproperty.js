const express =require('express')
const router = express.Router()
const rentpropertyschema = require('../models/rentpropertysc')

router.get("/",async(req,res)=>
{
    try{
        const rent_obj = await rentpropertyschema.find()
        res.json(rent_obj)
    }
    catch(e)
    {
        res.send(e);
    }
})

router.post("/",async(req,res)=>
{
    const rent_obj =new rentpropertyschema(
        {
            id : req.body.id,
            customername : req.body.customername,
            mobileno : req.body.mobileno,
            email : req.body.email,
            address : req.body.address,
            image1 : req.body.image1,
            image2 : req.body.image2,
            image3 : req.body.image3,
        })
    try{
       const a1 =await rent_obj.save()
       res.json(a1)
    }
    catch(e)
    {
        res.send(e);
    }
})


router.put("/:id", (req, res) => {
    rentpropertyschema.findOneAndUpdate( {id: req.params.id},req.body,{useFindAndModify: false},  function(err, result) {
        if (err) 
            return res.status(400).json({ error: err })
        return res.status(200).json( { result } )
    });			
});

router.delete("/:id", (req, res) => {
    rentpropertyschema.deleteOne({ id: req.params.id }, function(err, result) {
        if (err)
            return res.status(400).json({ error: err }) 
        return res.status(200).json({ result });
    });
});

module.exports =router



// {
//     "id" : 1,
//     "customername" : "mit",
//     "mobileno" : 7046264495,
//     "email" : "mitvirani444@gmail.com",
//     "adderss" : "sukan heights" ,
//     "image1" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7GCLlsnJWpN214aTwvRDa--EOMZQvdMGl00jAz8Zr1g&s",
//     "image2" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvRwVqAELrOrhwjWwkVF8mDGE94tOpTVGSNRHl8H0hiw&s",
//     "image3" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8tF-Veo_0fKEhcwXKer3jVk4CAKsG1an-HjQiNiB0lg&s"
// }