# MEN Stack Nutritional Consultations and Follow-Up with Session Authentication

This application is designed to facilitate personalized nutritional consultations and follow-ups between clients and nutritionists. Built using Node.js, Express, MongoDB, and EJS, the app offers an authenticated, session-based experience with full CRUD functionality. Clients can fill out detailed health forms, subscribe to nutrition plans, and track their progress over time, while nutritionists can manage client data, create customized dietary plans, and follow up regularly. The app aims to streamline the consultation process, ensuring a seamless experience for clients and efficient management for nutritionists.


## Planinig

- [Trello](https://trello.com/invite/b/671e1810b3b2ed1e31403ea8/ATTI47001580ad96fcc50e5c546e0f9f36ec3F47BD73/nutritionalconsultationsfollowup) 


## User Schema psedo code 
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