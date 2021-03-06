var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

module.exports = function(instancia) {

    var users = require('./routes/users');
    var endpoints = require('./backend/endpoints');
    var app = express();

    instancia.app = app;

    app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());

    endpoints.inyectar(app);
    app.use('/', express.static('public'));
    app.use('/users', users);
    require('./routes/routes')(instancia);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
      app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: err
        });
      });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {}
      });
    });

    app.createRoutes = function(instancia) {
        //var routes =
        require('./routes/routes')(instancia);
        //console.log(routes);
        //instancia.app.use('/', routes);
    }

    Array.prototype.contains = function(elem) {
        for (var i in this) {
            if (this[i] == elem) return true;
        }
        return false;
    }

    Array.prototype.contains = function(elem, booleanF) {
        for (var i in this) {
            if (booleanF(this[i],elem)) return true;
        }
        return false;
    }

    Array.prototype.remove = function(booleanF) {
        for (var i in this) {
            if (booleanF(this[i])) {
                this.splice(i,1);
                return;
            }
        }

        throw 'Ningun elemento fue eliminado con ese criterio';
    }
}
