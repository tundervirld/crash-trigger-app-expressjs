var express = require('express');
var router = express.Router();

require('dotenv').config()

/* GET home page. */
router.get('/', function(req, res, next) {

  //*Client IP
  const clientIp = req.ip || req.socket.remoteAddress;
  res.render('index', { 
      ldffkey: process.env.FFLDKEY,
      ldclientid: process.env.LDCLIENTID,
      lduser: {"key": "Crash User " + clientIp}
    }
  );
  
});

module.exports = router;
