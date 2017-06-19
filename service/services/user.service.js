const mongoose = require('mongoose'),
      ObjectId = require('mongodb').ObjectID;
var User       = require('../models/user');
var jwt        = require('jsonwebtoken');
var consts     = require('../consts.js');

var service = {};

service.getData            = getData;
service.login              = login;
service.getUserById        = getUserById;
service.getPrefById        = getPrefById;
service.setPref            = setPref;
service.getUser            = getUser;
service.addTrackToPlaylist = addTrackToPlaylist;
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

function getUserById(userId){
  return new Promise((resolve, reject) => {
    User.findOne({_id: ObjectId(userId)},
        (err, user) => {
          if(err) {
            reject(err);
            console.log('getUser STATUS: FAILED');
          }
          console.log('getUser STATUS: SUCCESS');
          if(!user) {
            console.log("info : wrong username");
            return resolve(err);
          }
          resolve(user);
        });
  });
}
function getUser(username){
  return new Promise((resolve, reject) => {
    User.findOne({username: username},
        (err, user) => {
          if(err) {
            reject(err);
            console.log('getUser STATUS: FAILED');
          }
          console.log('getUser STATUS: SUCCESS');
          if(!user) {
            console.log("info : wrong username");
            return resolve(err);
          }
          resolve(user);
        });
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
          if(!(user.password === password)) {
            console.log("info : wrong password");
            return resolve({"info": " wrong password"});
          }

          resolve({
                _id: user._id,
                username: user.username,
                token: jwt.sign({ sub: user._id }, consts.secret)
            });
        });
    });
}
function getPrefById(username){
  console.log("Trace: getPrefById("+username+")");
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
function setPref(username, userParam) {
    return new Promise((resolve, reject) => {
          var conditions = {username: username},
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
                console.log(`updatePREF STATUS: SUCCESS`);
            }

            });
          resolve();
        });
}

function addTrackToPlaylist(trackId, userId, playlistName) {
  console.log('Trace: addTrackToPlaylist('+trackId+','+userId+','+playlistName+')');
  return new Promise((resolve, reject) => {
    let user = getUserById(userId).then((user)=> {
      user.playlists.forEach(function(pl) {
        console.log(pl);
        if(pl.name === playlistName){
          pl.tracks.push(trackId);
        }
      });
      user.save((err) => {
        if(err){
          console.log(`err: ${err}`);
          resolve(false);
          return;
        }
        else
          console.log(`Saved document: ${JSON.stringify(user)}`);
    });
    resolve(true);
    // let conditions = {_id: ObjectId(userId) , playlists: playlistName};
    // let update = {}
    });
  });
}
