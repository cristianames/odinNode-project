var express = require('express');
var router = express.Router();

router.get('/app', function(req, res) {
  res.sendFile('index.html', { root: './' });
});

router.get('/app/*', function(req, res) {
  res.sendFile('index.html', { root: './' });
});

module.exports = router;
