var express = require('express');
var router = express.Router();
var userService = require('../services/user.service');
var session = require('express-session');
// var cookieParser = require('cookie-parser');
var User = require('../models/user');
var consts = require('../consts.js');

// router.use(cookieParser());
// router.use(session({
//   cookieName: 'session',
//   secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
//   duration: 30 * 60 * 1000,
//   activeDuration: 5 * 60 * 1000,
//   httpOnly: true,
//   secure: true,
//   ephemeral: true
// }));

router.use(function(req, res, next) {
  if (req.session && req.session.user) {
    userService.getUser(req.session.user.username)
    .then(function(user){
      if (user) {
        console.log("in use");
        req.user = user;
        delete req.user.password; // delete the password from the session
        req.session.user = user;  //refresh the session value
        res.locals.user = user;
      }
      // finishing processing the middleware and run the route
      next();
    })
    .catch(function (err) {
            res.status(400).send(err);
        });
  }
  else 
    next();
});

// routes
router.post('/login', login);
router.post('/register', register);
router.get('/logout', logout);
router.get('/getPrefById', checkSignIn, getPrefById);
router.post('/setPref', checkSignIn, setPref);
router.delete('/:_id', _delete);
router.get('/login', function(req, res){
   res.send('login page');
});

module.exports = router;

function login(req, res) {
    userService.login(req.body.username, req.body.password)
        .then(function (token) {
            if (token) {
              // var decoded = jwt.decode(token, consts.secret);
              // console.log(decoded.sub.user._id);
              userService.getUser(req.body.username)
                .then(function(user){
                  if (user) {
                    req.user = user;
                    console.log(req.user.username);
                    delete req.user.password; // delete the password from the session
                    req.session.user = user;  //refresh the session value
                    res.locals.user = user;
                    console.log(req.session.user.username);
                    // authentication successful
                    req.session.token = token;
                    console.log(req.session.user.username);
                    res.send({ token: token });
                  }
                })
                .catch(function (err) {
                        res.status(400).send(err);
                    });
                
            } else {
                // authentication failed
                res.status(401).send('Username or password is incorrect');
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function register(req, res) {
    userService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getPrefById(req, res) {
    userService.getPrefById(req.session.user.username)
        .then(function (user) {
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function setPref(req, res) {
    userService.setPref(req.session.user.username, req.body)
        .then(function (user) {
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _delete(req, res) {
    userService.delete(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function checkSignIn(req, res, next){
   if (!req.session.token ) {
    console.log("checkSignIn.: NOT");
    res.redirect('/users/login');
  } else {
    next();
  }
}

function logout(req, res){
   req.session.destroy(function(){
        sess=null;
      console.log("user logged out.");
   });
   res.redirect('/users/login');
}
