var express = require('express');

module.exports = function(instancia) {

  var router = express.Router();
  router.get('/*', function(req, res) {
    //res.sendFile('index.html', { root: './' });
    res.setHeader('Content-Type', 'text/html');
    res.send(instancia.cache_get('index.html') );
  });

  instancia.app.use('/', router);
};