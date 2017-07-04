const express    = require('express'),
      app        = express(),
      user       = require('./controllers/userController'),
      bodyParser = require('body-parser'),
      port       = process.env.PORT || 3000;
var expressJwt = require('express-jwt');
var session = require('express-session');
var consts = require('./consts.js');
var userService = require('./services/user.service');
var cors = require('cors');

app.use(cors());
app.set('port',port);
app.use('/', express.static('./public')); //for API
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(session({ secret: consts.secret, resave: false, saveUninitialized: true }));

app.use(expressJwt({
    secret: consts.secret,
    getToken: function (req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    }
}).unless({ path: ['/users/login'] }));


app.use(
    (req,res,next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept");
        next();
});

app.get('/', (req,res) => {
  console.log('Trace: API Page');
  res.sendFile(__dirname + '/api/index.html');
});

/*** All routes ***/
app.use('/users', require('./controllers/userController'));
app.use('/tracks', require('./controllers/trackController'));
// app.get('/relabel/getUserData', user.getData);
// app.get('/relabel/login', user.login);
//app.get('/bookstore/saveFairytailData', fairytail.saveData);
app.listen(port,
    () => {
        console.log(`listening on port ${port}`);
});
