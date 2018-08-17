var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var data;
  if(req.session.user){
    console.log('data')
    console.log(req.session.user)
    data = {
      isLogin: true,
      uesr:{
        avatar: req.session.user.avatar,
        username: req.session.user.avatar
      }
    }
  }else{
    data = {
      isLogin: false
    }
  }
  console.log(data)
  res.render('index', data);
});

module.exports = router;
