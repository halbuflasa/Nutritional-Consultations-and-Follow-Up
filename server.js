const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const addUserToViews = require('./middleware/addUserToViews');
require('dotenv').config();
require('./config/database');
const path = require('path');

// Controllers
const authController = require('./controllers/auth');
const isSignedIn = require('./middleware/isSignedIn');
const healthDataController = require('./controllers/healthData');

const app = express();
// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : '3000';

// MIDDLEWARE

// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride('_method'));
// Morgan for logging HTTP requests
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);

app.use(addUserToViews);

app.get('/', async (req, res) => {
  if (req.session.user) {
    console.log(req.session.user);
    return res.redirect(`/users/${req.session.user._id}/healthData`);
  }
  res.render('index.ejs');
});
app.use('/auth', authController);
app.use('/healthData', healthDataController);
app.use(isSignedIn);
app.use('/users/:userId/healthData', healthDataController);


app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`The express app is ready on port ${port}!`);
});
