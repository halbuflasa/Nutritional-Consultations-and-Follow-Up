# MEN Stack Nutritional Consultations and Follow-Up with Session Authentication

This application is designed to facilitate personalized nutritional consultations and follow-ups between clients and nutritionists. Built using Node.js, Express, MongoDB, and EJS, the app offers an authenticated, session-based experience with full CRUD functionality. Clients can fill out detailed health forms, subscribe to nutrition plans, and track their progress over time, while nutritionists can manage client data, create customized dietary plans, and follow up regularly. The app aims to streamline the consultation process, ensuring a seamless experience for clients and efficient management for nutritionists.


## Planinig

- [Trello](https://trello.com/invite/b/671e1810b3b2ed1e31403ea8/ATTI47001580ad96fcc50e5c546e0f9f36ec3F47BD73/nutritionalconsultationsfollowup) 


## User Schema pseudo code
```javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ClientData Schema (Referenced by User)
const clientDataSchema = new Schema({
  weight: { type: Number },
  height: { type: Number },
  age: { type: Number },
  allergies: [String],
  userID: { type: Schema.Types.ObjectId, ref: 'User', unique: true }, // Each ClientData is associated with one User
});

// Subscription Schema (Referenced by User)
const subscriptionSchema = new Schema({
  packageType: { type: String, enum: ['Basic', 'Premium'] },
  startDate: { type: Date },
  endDate: { type: Date },
  paymentStatus: { type: String, enum: ['Paid', 'Unpaid'] },
  userID: { type: Schema.Types.ObjectId, ref: 'User' }, // Each Subscription is associated with one User
});

// FollowUp Schema (Referenced by User)
const followUpSchema = new Schema({
  timestamp: { type: Date, default: Date.now },
  notes: { type: String },
  userID: { type: Schema.Types.ObjectId, ref: 'User' }, // References the client
  nutritionistID: { type: Schema.Types.ObjectId, ref: 'User' }, // References the nutritionist
});

// NutritionPlan Schema (Referenced by User)
const nutritionPlanSchema = new Schema({
  caloricIntake: { type: Number },
  mealSuggestions: [String],
  userID: { type: Schema.Types.ObjectId, ref: 'User' }, // References the client
  nutritionistID: { type: Schema.Types.ObjectId, ref: 'User' }, // References the nutritionist
});

// User Schema (Referenced in other schemas)
const userSchema = new Schema({
  role: { type: String, enum: ['Client', 'Nutritionist'] },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
});

// Models
const User = mongoose.model('User', userSchema);
const ClientData = mongoose.model('ClientData', clientDataSchema);
const Subscription = mongoose.model('Subscription', subscriptionSchema);
const FollowUp = mongoose.model('FollowUp', followUpSchema);
const NutritionPlan = mongoose.model('NutritionPlan', nutritionPlanSchema);

module.exports = { User, ClientData, Subscription, FollowUp, NutritionPlan };
```



# App Implementation Pseudocode
```pseudocode


// 1. App Initialization
function initializeApp() {
    connect to MongoDB database
    set up Express server
    configure middleware (bodyParser, session, etc.)
    configure routes (user, clientData, subscription, followUp, nutritionPlan)
    start server on specified port
}

// 2. User Authentication

// User Registration
function registerUser(name, email, password, role) {
    if (email already exists) {
        return "Email already registered."
    } else {
        hash password
        create new User in the database with provided details
        return "Registration successful."
    }
}

// User Login
function loginUser(email, password) {
    retrieve user by email
    if (user exists) {
        if (password matches) {
            create session for user
            return "Login successful."
        } else {
            return "Invalid password."
        }
    } else {
        return "User not found."
    }
}

// User Logout
function logoutUser(session) {
    destroy session
    return "Logout successful."
}

// 3. Client Data Management

// Submit Health Data
function submitHealthData(clientID, weight, height, age, allergies) {
    create new ClientData entry
    associate with clientID
    return "Health data submitted successfully."
}

// Retrieve Client Health Data
function getClientHealthData(clientID) {
    retrieve ClientData by clientID
    return ClientData
}

// 4. Subscription Management

// Create Subscription
function createSubscription(clientID, packageType) {
    if (packageType not in ['Basic', 'Premium']) {
        return "Invalid package type."
    } else {
        create new Subscription entry
        set startDate to current date
        set endDate based on package duration
        return "Subscription created successfully."
    }
}

// Get Subscription Details
function getSubscriptionDetails(clientID) {
    retrieve Subscription by clientID
    return Subscription details
}

// 5. Follow-Up Management

// Log Weekly Follow-Up
function logWeeklyFollowUp(clientID, nutritionistID, notes) {
    create new FollowUp entry
    associate with clientID and nutritionistID
    return "Follow-up logged successfully."
}

// Retrieve Follow-Up Notes
function getFollowUpNotes(clientID) {
    retrieve FollowUp entries for clientID
    return list of FollowUp entries
}

// 6. Nutrition Plan Management

// Create Nutrition Plan
function createNutritionPlan(clientID, nutritionistID, caloricIntake, mealSuggestions) {
    create new NutritionPlan entry
    associate with clientID and nutritionistID
    return "Nutrition plan created successfully."
}

// Get Nutrition Plan Details
function getNutritionPlan(clientID) {
    retrieve NutritionPlan by clientID
    return NutritionPlan details
}

// 7. Dashboard Display

// Client Dashboard
function displayClientDashboard(clientID) {
    clientData = getClientHealthData(clientID)
    subscriptionDetails = getSubscriptionDetails(clientID)
    followUpNotes = getFollowUpNotes(clientID)
    display clientData, subscriptionDetails, followUpNotes
}

// Nutritionist Dashboard
function displayNutritionistDashboard(nutritionistID) {
    clients = getClientsForNutritionist(nutritionistID)
    for each client in clients {
        clientData = getClientHealthData(client.id)
        followUpNotes = getFollowUpNotes(client.id)
        display clientData, followUpNotes
    }
}



```
