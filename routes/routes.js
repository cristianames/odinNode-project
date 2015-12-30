var express = require('express');
var router = express.Router();

router.get('/*', function(req, res) {
  res.sendFile('public/index.html', { root: './' });
});

module.exports = router;
