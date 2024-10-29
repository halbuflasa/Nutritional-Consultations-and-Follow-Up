const mongoose = require('mongoose');

const healthDataSchema = new mongoose.Schema({
    weight:{
       type: Number, 
       required: true, 
    },
    height: {
       type: Number, 
       required: true, 
    },
    age: {
        type: Number, 
        required: true, 
    },
    gender: {
        type : String, 
        enum: ['male','female'],
        required: true,
       
    },
    activityLevel: {
        type : String, 
        enum: ['sedentary', 'light', 'moderate', 'heavy', 'very heavy'], 
        required: true,
       
    },
    /* foodAllergies: {
      
    }, */ 
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true  },
});


module.exports = mongoose.model('HealthData', healthDataSchema);
