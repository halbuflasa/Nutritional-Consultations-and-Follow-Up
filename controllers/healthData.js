const express = require('express');
const router = express.Router();

const Listing = require('../models/healthData');

router.get('/',async(req, res)=>{
try{

res.render('healthData/index.ejs');
}

catch(error){
    console.log(error)
    res.redirect('/')
}
});

router.get('/new', async (req, res) => {
    try{
        //const existingHealthData = await HealthData.findOne({ userId: req.session.user._id });
        //if (existingHealthData) {
            //  redirect to the health data view or edit page 
           // return  res.redirect('/');
        //}   
        res.render('healthData/new.ejs')
      }catch(error){
          console.log(error)
          res.redirect('/')
      }
  });



module.exports = router;