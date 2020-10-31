const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const bicicletas2Router = require('./routes/bicicletas');
const bicicletasRouter = require('./routes/bicicleta');
const bicicletasAPIRouter = require('./routes/api/bicicletasapi');
const bicicletasAPIRouter2 = require('./routes/api/bicicletasapi2');
const usuariosRouter = require('./routes/usuarios');

const app = express();

//Conexion con MongoDB
const mongoose = require('mongoose');
const mongodb = 'mongodb://localhost/bicicletas';
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
const db= mongoose.connection;
db.on('error', console.error.bind(console, 'Error al conectarse con la base de datos'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.engine('pug', require('pug').__express)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/bicicletas', bicicletasRouter);
app.use('/bicicletas2', bicicletas2Router);
app.use('/usuarios', usuariosRouter);
app.use('/api/bicicletas2', bicicletasAPIRouter);
app.use('/api/bicicletas', bicicletasAPIRouter2);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
