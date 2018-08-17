var express = require('express');
var router = express.Router();

var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;



//用户登录信息传递过来之后，passport生成一个session，存储到自己的内存里，也可以存储到数据库里。
passport.serializeUser(function(user, done) {
  console.log('---serializeUser---')
  console.log(user.id)
  //以用户的id作为 session的id 存起来
  done(null, user.id);
});

//用户刷新页面时，会再从内存里将对应得 session 拿出来解析，验证他是这个用户
passport.deserializeUser(function(obj, done) {
  console.log('---deserializeUser---')
  //从User的model里取，User是定义的一个用户的模型，有一个数据库。session 通过 id 得到里面的信息，再从新拿出来
  User.findById(id,function(err,uesr){
    done(err, user);
  })
});


//配置
//会向第三方网站后台发送请求，网站后台再向它的服务器发送请求，
//把 clientID 和 clientSecret 这些参数传给服务器，
//服务器进行验证，验证通过后，会向用户弹出一个登陆页面
//用户登录成功之后，服务器会调一些回调的接口，
passport.use(new GitHubStrategy({
    clientID: 'b7bfd7fcc56fdb76ad7f',
    clientSecret: 'acbbfd5555ded60add3c1069a75d5fd32301b621',
    callbackURL: "http://post.hunger-valley.com/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    // });
    done(null, profile);
  }
));



router.get('/logout', function(req, res){
  req.session.destroy();
  console.log('logout')
  res.redirect('https://www.baidu.com');
})


//用户点击登录按钮，触发登录，向第三方网站后台发送请求，网站后台再向它的服务器发送请求，
router.get('/github',
  passport.authenticate('github'));

//第三方返回的请求，会向callback地址发送信息
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    req.session.user = {
      id: req.user.id,
      username: req.user.displayName || req.user.username,
      avatar: req.user._json.avatar_url,
      provider: req.user.provider
    };
    res.redirect('/');
  });



  


module.exports = router;
