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
    name:{
        type : String, 
        required: true,
       
    },

    activityLevel: {
        type : String, 
        enum: ['sedentary', 'light', 'moderate', 'heavy', 'very heavy'], 
        required: true,
       
    },
    
    BMR: { type: Number }, 
    dailyCalories: { type: Number } ,
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true  },
});

healthDataSchema.methods.calculateDailyCalories = function () {
    let BMR;
    const { weight, height, age, gender, activityLevel } = this;

    // Calculate BMR based on gender
    if (gender === 'male') {
        BMR = 66.47 + (13.75 * weight) + (5.003 * height) - (6.755 * age);
    } else {
        BMR = 655.09 + (9.563 * weight) + (1.849 * height) - (4.675 * age);
    }

    // Calculate daily calorie intake based on activity level
    let dailyCalories;
    switch (activityLevel) {
        case 'sedentary':
            dailyCalories = BMR * 1.2;
            break;
        case 'light':
            dailyCalories = BMR * 1.375;
            break;
        case 'moderate':
            dailyCalories = BMR * 1.55;
            break;
        case 'heavy':
            dailyCalories = BMR * 1.725;
            break;
        case 'very heavy':
            dailyCalories = BMR * 1.9;
            break;
        default:
            dailyCalories = BMR * 1.2;
    }

    return { BMR, dailyCalories };
};


module.exports = mongoose.model('HealthData', healthDataSchema);
