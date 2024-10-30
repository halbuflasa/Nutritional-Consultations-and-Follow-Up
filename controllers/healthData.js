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
   const healthData = new HealthData(req.body);
      // Calculate BMR and daily calories using the method defined in the schema
   const { BMR, dailyCalories } = healthData.calculateDailyCalories();
   healthData.BMR = BMR;
   healthData.dailyCalories = dailyCalories;
   await healthData.save();
   console.log(healthData);
   res.redirect('/healthData');
  });

  router.get('/:healthDataId', async (req, res) => {
    try {
        const populatedHealthData = await HealthData.findById(req.params.healthDataId).populate('userId');
        if (!populatedHealthData) return res.redirect('/');
        res.render('healthData/show.ejs', {
            healthData: populatedHealthData,
        });
     } catch(error){
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
        const currentHealthData = await HealthData.findById(req.params.healthDataId);
        
        if (currentHealthData.userId.equals(req.session.user._id)){
            currentHealthData.weight = req.body.weight;
            currentHealthData.height = req.body.height;
            currentHealthData.age = req.body.age;
            currentHealthData.gender = req.body.gender;
            currentHealthData.activityLevel = req.body.activityLevel;
            currentHealthData.name = req.body.name;
             // Recalculate BMR and dailyCalories based on updated fields
             const { BMR, dailyCalories } = currentHealthData.calculateDailyCalories();
             currentHealthData.BMR = BMR;
             currentHealthData.dailyCalories = dailyCalories;

             await currentHealthData.save();
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