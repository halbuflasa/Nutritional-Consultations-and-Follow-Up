# MEN Stack Nutritional Consultations and Follow-Up with Session Authentication

This application is designed to facilitate personalized nutritional consultations and follow-ups between clients and nutritionists. Built using Node.js, Express, MongoDB, and EJS, the app offers an authenticated, session-based experience with full CRUD functionality. Clients can fill out detailed health forms, subscribe to nutrition plans, and track their progress over time, while nutritionists can manage client data, create customized dietary plans, and follow up regularly. The app aims to streamline the consultation process, ensuring a seamless experience for clients and efficient management for nutritionists.


## Planinig

- [Trello](https://trello.com/invite/b/671e1810b3b2ed1e31403ea8/ATTI47001580ad96fcc50e5c546e0f9f36ec3F47BD73/nutritionalconsultationsfollowup) 


## User Schema
# user.js
```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
```

# healthData.js
```javascript
const mongoose = require('mongoose');

const healthDataSchema = new mongoose.Schema({
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  age: { type: Number, required: true },
  activityLevel: { type: String, enum: ['sedentary', 'light', 'moderate', 'heavy', 'very heavy'], required: true },
  allergies: { type: [String], default: [] },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('HealthData', healthDataSchema);

```

# nutritionPlan.js
```javascript
const mongoose = require('mongoose');

const nutritionPlanSchema = new mongoose.Schema({
  dailyCalorieIntake: { type: Number, required: true },
  meals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meal' }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('NutritionPlan', nutritionPlanSchema);

```

# meal.js.js
```javascript
const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  calories: { type: Number, required: true },
  mealTime: { type: String, enum: ['breakfast', 'lunch', 'dinner', 'snack'], required: true },
  ingredients: { type: [String], required: true }
});

module.exports = mongoose.model('Meal', mealSchema);

```
# Wireframe
## Sign-Up/Log-In Page

A form where users can register or log in to their account.

- **Fields**: Username, Password, Sign-Up and Log-In buttons.

## User Dashboard

Display user's health data and a navigation menu to access different sections like health data, nutrition plan, and meal suggestions.

- **Buttons** for updating health data and managing the nutrition plan.

## Health Data Form

A form for entering or updating health data.

- **Fields**: Weight, Height, Age, Activity Level (dropdown), Allergies (multiple select).
- **Submit button** for saving changes.

## Nutrition Plan Page

Displays the calculated daily calorie intake and meal suggestions (breakfast, lunch, dinner, snacks).

- **Option** to update or regenerate the meal plan.
- **Show meals** with their calorie distribution and the ingredients list (filtered by allergies).

## Meal Details Page

Show the details of each meal, including the name, calorie content, meal time, and list of ingredients.

- **Option to customize the meal** (e.g., swap ingredients).

# Pseudo Code
## 1. User Authentication (Sign-Up/Log-In)

```pseudo
FUNCTION signUp(username, password):
    IF username or password is empty:
        RETURN "Error: Username and password required"
    IF username already exists:
        RETURN "Error: Username already taken"
    CREATE newUser with username and hashed password
    SAVE newUser to database
    RETURN "Sign-Up Successful"

FUNCTION logIn(username, password):
    FIND user by username
    IF user does not exist:
        RETURN "Error: User not found"
    VERIFY password with the stored hashed password
    IF password does not match:
        RETURN "Error: Invalid password"
    CREATE session for user
    RETURN "Log-In Successful"
    ```

2. Health Data Management

FUNCTION enterHealthData(userId, weight, height, age, activityLevel, allergies):
    IF any required field is empty:
        RETURN "Error: All fields are required"
    FIND HealthData by userId
    IF HealthData exists:
        UPDATE HealthData with new values
    ELSE:
        CREATE new HealthData with given values
    SAVE HealthData to database
    RETURN "Health Data Saved Successfully"

FUNCTION viewHealthData(userId):
    FIND HealthData by userId
    IF HealthData does not exist:
        RETURN "No Health Data Available"
    RETURN HealthData

FUNCTION deleteHealthData(userId):
    FIND HealthData by userId
    IF HealthData does not exist:
        RETURN "Error: No Health Data to delete"
    DELETE HealthData
    RETURN "Health Data Deleted Successfully"
3. Nutrition Plan Calculation (Harris-Benedict Equation)

FUNCTION calculateDailyCalories(weight, height, age, activityLevel, gender):
    IF gender is "male":
        BMR = 66.47 + (13.75 * weight) + (5.003 * height) - (6.755 * age)
    ELSE:
        BMR = 655.09 + (9.563 * weight) + (1.849 * height) - (4.675 * age)

    SWITCH activityLevel:
        CASE "sedentary":
            dailyCalories = BMR * 1.2
        CASE "light":
            dailyCalories = BMR * 1.375
        CASE "moderate":
            dailyCalories = BMR * 1.55
        CASE "heavy":
            dailyCalories = BMR * 1.725
        CASE "very heavy":
            dailyCalories = BMR * 1.9
        DEFAULT:
            dailyCalories = BMR * 1.2

    RETURN dailyCalories
4. Meal Plan Generation

FUNCTION generateMealPlan(userId, dailyCalories):
    FIND user's allergies
    meals = []
    caloriesLeft = dailyCalories

    FOR EACH mealTime in ["breakfast", "lunch", "dinner", "snack"]:
        mealCalories = ALLOCATE calories for mealTime
        availableMeals = FIND Meals WHERE calories <= mealCalories AND ingredients do not include user's allergies
        selectedMeal = RANDOMLY select from availableMeals
        ADD selectedMeal to meals
        SUBTRACT selectedMeal.calories from caloriesLeft

    SAVE meals to NutritionPlan for userId
    RETURN "Meal Plan Generated Successfully"
5. Meal Customization

FUNCTION customizeMeal(nutritionPlanId, mealId, newMeal):
    FIND NutritionPlan by nutritionPlanId
    IF NutritionPlan does not exist:
        RETURN "Error: Nutrition Plan not found"
    FIND meal by mealId in NutritionPlan
    IF meal does not exist:
        RETURN "Error: Meal not found in Nutrition Plan"
    REPLACE meal with newMeal
    SAVE updated NutritionPlan
    RETURN "Meal Customized Successfully"
6. Confirmation Messages

FUNCTION displayConfirmationMessage(action):
    SWITCH action:
        CASE "updateHealthData":
            RETURN "Your health data has been updated successfully."
        CASE "updateNutritionPlan":
            RETURN "Your nutrition plan has been updated successfully."
        CASE "deleteHealthData":
            RETURN "Your health data has been deleted successfully."
        DEFAULT:
            RETURN "Action completed successfully."

```