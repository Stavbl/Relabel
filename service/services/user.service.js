const mongoose = require('mongoose');
var User = require('../models/user');

exports.getData = function(req,res){
    FT.find({},
    (err,docs) => {
        if(err) console.log(`query error: ${err}`);
        console.log(docs);
        res.json(docs);
        return;
    });
}
exports.login = function(username, password){
    return new Promise((resolve, reject) => {
      User.findOne({username: username},
        (err, user) => {
          if(err) {
            reject({"error": err});
            console.log('STATUS: FAILED');
          }
          console.log('STATUS: SUCCESS');
          if(!user) {
            console.log("info : wrong username");
            return resolve({"info": " wrong username"});
          }
          console.log(user.password);
          console.log(password);

          if(!user.password === password) {
            console.log("info : wrong password");
            resolve({"info": " wrong password"});
          }

          resolve(user);
        });
    });
}
// function authenticate(username, password) {
//     var deferred = Q.defer();

//     db.users.findOne({ username: username }, function (err, user) {
//         if (err) deferred.reject(err.name + ': ' + err.message);

//         if (user && bcrypt.compareSync(password, user.hash)) {
//             // authentication successful
//             deferred.resolve({
//                 _id: user._id,
//                 username: user.username,
//                 firstName: user.firstName,
//                 lastName: user.lastName,
//                 token: jwt.sign({ sub: user._id }, config.secret)
//             });
//         } else {
//             // authentication failed
//             deferred.resolve();
//         }
//     });

//     return deferred.promise;
// }
// const data        = require('../data/securitySettingsDB.json'),
//       consts      = require('../models/consts'),
//       mongoose    = require('mongoose'),
//       ObjectId = require('mongodb').ObjectID;

// const conn = mongoose.connection;
// var User = require('../models/user');

// class Methods {

//   connectToDB() {
//     mongoose.connect(consts.MLAB_KEY, function(err){
//       if (err) {
//         console.err(err);
//       } else {
//         console.log('Connected');
//       }
//     });
//   }
//   getAllUsers() {
//     console.log("Trace : getAllUsers()");
//     this.connectToDB();
//     return new Promise((resolve, reject) => {
//       User.find({},
//         (err, users) => {
//           if(err) {
//             reject({"error": err});
//             console.log('STATUS: FAILED');
//           }
//           console.log('STATUS: SUCCESS');
//           resolve(users);
//         }
//       );
//     });
//   }
//   getUserById(id) {
//     console.log("Trace : getUserById("+id+")");
//     this.connectToDB();
//     return new Promise((resolve, reject) => {
//       User.find({_id: ObjectId(id)},
//         (err, user) => {
//           if(err) {
//             reject({"error": err});
//             console.log('STATUS: FAILED');
//           }
//           console.log('STATUS: SUCCESS');
//           if(!user.length) {
//             console.log("info : there are no users who got this id");
//             resolve({"info": "there are no users who got this id"});
//           }
//           resolve(user);
//         });
//     });
//   }
//   getAlertsDevices(alerts, devices) {
//     console.log("Trace : getAlertsDevices("+alerts+", "+devices+")");
//     if(!(alerts == 'true' || alerts == 'false') || isNaN(devices)) {
//       console.log("error: unexpected variables were posted")
//       return {"error": "unexpected variables were posted"}
//     }
//     var alrtsBool = (alerts === 'true');
//     var devNum = parseInt(devices);

//     this.connectToDB();
//     return new Promise((resolve, reject) => {
//       var conditions = {'settings.login_alerts':alrtsBool, "settings.recognized_devices_length":{ "$gte": devNum}};
//       User.find(conditions,
//         (err, users) => {
//           if(err) {
//             reject({"error": err});
//             console.log('STATUS: FAILED');
//           }
//           console.log('STATUS: SUCCESS');
//           if(!users.length) {
//             console.log("info : there are no users who match this condition");
//             resolve({"info": "there are no users who match this condition"});
//           }
//           resolve(users);
//         });
//     });
//   }
// }

// module.exports = function() {
//   var methods = new Methods();
//   return methods;
// }
