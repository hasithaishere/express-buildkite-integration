const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const appServer = express();

appServer.disable("x-powered-by");

// view engine setup
appServer.set('views', path.join(__dirname, 'views'));
appServer.set('view engine', 'ejs');

appServer.use(logger('dev'));
appServer.use(express.json());
appServer.use(express.urlencoded({ extended: false }));
appServer.use(cookieParser());
appServer.use(express.static(path.join(__dirname, 'public')));

appServer.use('/', indexRouter);
appServer.use('/users', usersRouter);

// catch 404 and forward to error handler
appServer.use(function(req, res, next) {
  next(createError(404));
});

// error handler
appServer.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = appServer;
