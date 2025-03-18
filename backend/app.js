const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

// This will catch any Sequelize errors and formating them b4 sending the error response
const { ValidationError } = require('sequelize');

const { environment } = require('./config');
// This checks if project is in production environment or not
const isProduction = environment === 'production';

const app = express();

// backend/app.js
const routes = require('./routes');

// morgan middleware
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

// HELMET PACKAGE

// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
  }

  // helmet helps set a variety of headers to better secure your app
  app.use(
    helmet.crossOriginResourcePolicy({
      policy: "cross-origin"
    })
  );

  // Set the _csrf token and create req.csrfToken method
  app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
  );

  app.use(routes); // Connect all the routes below this seciton

  // catch ERRORS handler things that are not
  // catch unhandled request and forwards to error handler

   //this will handle error sthat have not yet being handleded with the error handlers
  // undersocre indicates that the variables are not being used
  app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    // DOUBLE CHECK IF THIS IS AN ARR Or and ONJ
    err.errors = { message: "The requested resource couldn't be found." };
    // OR
    // err.erros = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
  });

  // Process sequelize errors
  // This will require the const { ValidationError} = require('sequelize'); to be on each file
  app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
    if (err instanceof ValidationError) {
      let errors = {};
      for (let error of err.errors) {
        errors[error.path] = error.message;
      }
      err.title = 'Validation error';
      err.errors = errors;
    }
    next(err);
  });

// server error handler
// ERROR formator
  app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    // eventually this should be commented out for production
    console.error(err);
    res.json({
      title: err.title || 'Server Error',
      message: err.message,
      // beteter to have then in array of errors
      errors: err.errors,
      // if we are in production we wont provide the statck error
      stack: isProduction ? null : err.stack
    });
  });

  module.exports = app;
