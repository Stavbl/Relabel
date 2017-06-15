const mongoose = require('mongoose');
var User = require('../models/user');

var service = {};

service.getData = getData;
service.login = login;
service.getPrefById = getPrefById;
service.setPref = setPref;
// service.update = update;
// service.delete = _delete;

module.exports = service;

function getData(req,res){
    FT.find({},
    (err,docs) => {
        if(err) console.log(`query error: ${err}`);
        console.log(docs);
        res.json(docs);
        return;
    });
}
function login(username, password){
    return new Promise((resolve, reject) => {
      User.findOne({username: username},
        (err, user) => {
          if(err) {
            reject({"error": err});
            console.log('LOGIN STATUS: FAILED');
          }
          console.log('LOGIN STATUS: SUCCESS');
          if(!user) {
            console.log("info : wrong username");
            return resolve({"info": " wrong username"});
          }
          if(!user.password === password) {
            console.log("info : wrong password");
            resolve({"info": " wrong password"});
          }

          resolve(user);
        });
    });
}
function getPrefById(username){
    return new Promise((resolve, reject) => {
      User.findOne({username: username},
        (err, user) => {
          if(err) {
            console.log('getPrefById STATUS: FAILED');
            reject({"error": err});
          }
          console.log('getPrefById STATUS: SUCCESS');
          if(!user) {
            console.log("info : wrong username");
            return resolve({"info": " wrong username"});
          }
          resolve(user.preferences);
        });
    });
}
function setPref(userParam) { 
    return new Promise((resolve, reject) => {
      // User.findOne({username: userParam.username},
      //   (err, user) => {
      //     if(err) {
      //       reject({"error": err});
      //       console.log('setPREF STATUS: FAILED');
      //     }
      //     console.log('setPREF STATUS: SUCCESS');
      //     if(!user) {
      //       console.log("info : wrong username");
      //       return resolve({"info": " wrong username"});
      //     }
          var conditions = {username: userParam.username},
          update = {'preferences.0.value':userParam.detriot,
                    'preferences.1.value':userParam.hard,
                    'preferences.2.value':userParam.dance,
                    'preferences.3.value':userParam.minimal,
                    'preferences.4.value':userParam.classic,
                    'preferences.5.value':userParam.house,
                    'preferences.6.value':userParam.vgm,
                    'preferences.7.value':userParam.hard_acid,
                    'preferences.8.value':userParam.electro
                    },
          opts = {new:true};

          User.update(conditions, update, opts, 
            (err) => {
                if(err) {
                  reject({"error": err});
                  console.log('updatePREF STATUS: FAILED');
              }

            else{
                console.log(`updated doc: `);
            }

            });
          resolve();
        });
    // });
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
