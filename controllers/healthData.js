const express = require('express');
const router = express.Router();

const HealthData = require('../models/healthData');

router.get('/',async(req, res)=>{
try{
const populatedHealthData = await HealthData.find({}).populate('userId');
console.log('Populated Health Data:', populatedHealthData);
res.render('healthData/index.ejs',{
    healthData: populatedHealthData,
});
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

  router.post('/', async (req, res)=>{
   req.body.userId = req.session.user._id; 
   await HealthData.create(req.body);
   console.log(req.body);
   res.redirect('/healthData');
  });

  router.get('/:healthDataId', async (req, res) => {
    try {
        const populatedHealthData = await HealthData.findById(req.params.healthDataId).populate('userId');
        console.log('healthDataId:', req.params.healthDataId);
        res.render('healthData/show.ejs', {healthData: populatedHealthData,});
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});


module.exports = router;