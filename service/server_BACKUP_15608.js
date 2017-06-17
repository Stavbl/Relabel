<<<<<<< HEAD
const express = require('express'),
    app = express(),
    user = require('./controllers/userController'),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 3000,
    session = require('express-session');

// app.use(session({secret: 'ssshhhhh'}));
=======
const express    = require('express'),
      app        = express(),
      user       = require('./controllers/userController'),
      bodyParser = require('body-parser'),
      port       = process.env.PORT || 3000;

>>>>>>> 928115b9abcd2d86bbb671395ead57bc0d91e083
app.set('port',port);
app.use('/', express.static('./public')); //for API
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(
    (req,res,next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept");
        res.set("Content-Type", "application/json");
        next();
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
