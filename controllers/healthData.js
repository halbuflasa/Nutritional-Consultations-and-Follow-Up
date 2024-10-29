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
       // console.log('healthDataId:', req.params.healthDataId);
        res.render('healthData/show.ejs', {healthData: populatedHealthData,});
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.delete('/:healthDataId', async (req, res) => {
    try {
        const healthData = await HealthData.findById(req.params.healthDataId);
        
        if (healthData.userId.equals(req.session.user._id)){
           await  healthData.deleteOne();
           res.redirect('/healthData');

        }
        else{
            res.send(" You don't have permission to do that.");
        }
        
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});
router.get('/:healthDataId/edit', async (req, res) => {
    try {
        const currenthealthData = await HealthData.findById(req.params.healthDataId);
        if (!currenthealthData) {
            return res.redirect('/');
        }
        if (currenthealthData.userId.equals(req.session.user._id)){
        res.render('healthData/edit.ejs', { healthData: currenthealthData });
        }
        else{
             res.send(" You don't have permission to do that.");  
        }
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});


router.put('/:healthDataId', async (req, res) => {
    try {
        const currenthealthData = await HealthData.findById(req.params.healthDataId);
        
        if (currenthealthData.userId.equals(req.session.user._id)){
           await  currenthealthData.updateOne(req.body);
           res.redirect('/healthData');

        }
        else{
            res.send(" You don't have permission to do that."); 
        }
      
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});


module.exports = router;