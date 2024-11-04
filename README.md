# NutriCare: Personalized Nutritional Consultations and Health Management System

## Description:
NutriCare is a streamlined health management system tailored for nutritionists to conduct personalized nutritional consultations and follow-ups with their clients. Built using Node.js, Express, MongoDB, and EJS, NutriCare provides an authenticated, session-based experience with robust CRUD functionality. Designed exclusively for nutritionist use, NutriCare allows professionals to manage client data, create dietary plans, and log follow-up notes—all on behalf of their clients.


## Nutricare App
Through NutriCare, nutritionists can access a centralized dashboard to view and manage detailed client health records.
 [nutricare app](https://nutricare-b8e0bab4bf14.herokuapp.com/) 

![NutriCare App Dashboard](<assets/readme imgs/allrecords.png>)  
- Each nutritionist can view all client records within the system but can only edit or update records for their own clients, ensuring data integrity.

![NutriCare App New Record](<assets/readme imgs/newrecord.png>)  
- Include filling out health assessment forms.

![NutriCare App view a Record](<assets/readme%20imgs/view%20a%20record.png>)

- *The Basal Metabolic Rate (BMR) and Daily Calorie Intake are calculated using the Harris-Benedict Equation. This equation estimates the number of calories required based on personal attributes such as weight, height, age, gender, and activity level, which are inputted through the form. The calculated values help guide personalized nutrition plans.*

## Data Base Schema
![DB](<assets/readme imgs/DBMS ER diagram (UML notation).jpeg>)

## Routes 
| HTTP Method | Route                             | Description                                                                                      | Middleware                   |
|-------------|-----------------------------------|--------------------------------------------------------------------------------------------------|-------------------------------|
| **GET**     | `/`                               | Redirects signed-in users to their health data page or renders the home page for non-users       | `addUserToViews`              |
| **GET**     | `/auth/sign-up`                   | Renders the sign-up page (currently redirects to `/`)                                            |                               |
| **POST**    | `/auth/sign-up`                   | Handles user sign-up, creates a new user, and starts a session                                   |                               |
| **GET**     | `/auth/sign-in`                   | Renders the sign-in page (currently redirects to `/`)                                            |                               |
| **POST**    | `/auth/sign-in`                   | Handles user sign-in and starts a session                                                        |                               |
| **GET**     | `/auth/sign-out`                  | Destroys user session and redirects to home page                                                 |                               |
| **GET**     | `/healthData`                     | Shows all health data, populated with associated user info                                       | `addUserToViews`              |
| **GET**     | `/healthData/new`                 | Renders form to create new health data entry                                                     | `addUserToViews`, `isSignedIn`|
| **POST**    | `/healthData`                     | Creates new health data for the signed-in user, calculating BMR and daily calories               | `addUserToViews`, `isSignedIn`|
| **GET**     | `/healthData/:healthDataId`       | Shows details of a specific health data entry, populated with user info                          | `addUserToViews`, `isSignedIn`|
| **DELETE**  | `/healthData/:healthDataId`       | Deletes a specific health data entry if the current user is the owner                            | `addUserToViews`, `isSignedIn`|
| **GET**     | `/healthData/:healthDataId/edit`  | Renders edit form for a specific health data entry if the user is the owner                      | `addUserToViews`, `isSignedIn`|
| **PUT**     | `/healthData/:healthDataId`       | Updates a specific health data entry, recalculates BMR and daily calories, if user is the owner  | `addUserToViews`, `isSignedIn`|
| **GET**     | `/users/:userId/healthData`       | Redirects to specific user's health data page after signing in                                   | `addUserToViews`, `isSignedIn`|


## Attributions
 - [Sign In / Sign Up Slider Form ](https://codepen.io/chantallexandra/pen/VRmgYE) 
- [Trello for project management and planing](https://trello.com/invite/b/671e1810b3b2ed1e31403ea8/ATTI47001580ad96fcc50e5c546e0f9f36ec3F47BD73/nutritionalconsultationsfollowup) 
- [Used in ERD diagram](https://lucid.app/users/login#/login)

## Technologies used
- Node.js
- Express
- MongoDB
- Express
- Mongoose
- dotenv
- CSS
- Javascript


## Future Work 
-  Role-based authentication for nutritionists and clients
- As a client, I want to be able to view my nutrition plan and edit my personal data.
- As a client, I want the app to generate a daily meal plan that meets my required calorie intake, with meals distributed appropriately throughout the day.

- As a client, I want the system to automatically filter out ingredients I’m allergic to from meal suggestions, ensuring that my meal plan is safe and suitable for me to follow.