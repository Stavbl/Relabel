const consts      = require('../consts'),
      mongoose    = require('mongoose'),
      ObjectId    = require('mongodb').ObjectID;

const conn = mongoose.connection;
var User = require('../models/track');

class TrackController {

  connectToDB() {
    mongoose.connect(consts.MLAB_KEY, function(err){
      if (err) {
        console.err(err);
      } else {
        console.log('Connected');
      }
    });
  }

  getTracksByPref(id) {
    console.log("Trace : getTracksByPref("+id+")");
    var user = getUserById(id);
    return new Promise((resolve, reject) => {
      var genre[];
      for(let gen in user.preferences.genre) {
        if(gen.value > 0)
          genre.push(gen);
      }
      var conditions = {genre:{$in:genre}};
      Track.find(conditions,
        (err, tracks) => {
          if(err) {
            reject({"error": err});
            console.log('STATUS: FAILED');
          }
          console.log('STATUS: SUCCESS');
          if(!tracks.length) {
            console.log("info : there are no users who match this condition");
            resolve({"info": "there are no users who match this condition"});
          }
          resolve(tracks);
        });
    });
  }
  getUserById(id) {
    console.log("Trace : getUserById("+id+")");
    this.connectToDB();
    return new Promise((resolve, reject) => {
      User.find({_id: ObjectId(id)},
        (err, user) => {
          if(err) {
            reject({"error": err});
            console.log('STATUS: FAILED');
          }
          console.log('STATUS: SUCCESS');
          if(!user.length) {
            console.log("info : there are no users who got this id");
            resolve({"info": "there are no users who got this id"});
          }
          resolve(user);
        });
    });
  }
}

module.exports = function() {
  var trackController = new TrackController();
  return trackController;
}
