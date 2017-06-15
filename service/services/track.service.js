const ObjectId = require('mongodb').ObjectID;
var Track = require('../models/track');

exports.getTracksByPref = function(pref) {
  console.log("Trace : getTracksByPref("+pref+")");
  return new Promise((resolve, reject) => {
    var genre;
    var genreTotalVal = 0;
    for(let gen in pref) {
      console.log("type of genre.value: " + typeof(gen.value));
      if(gen.value > 0) {
        genre.push(gen);
        genreTotalVal += gen.value;
      }
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
        // make the precenteges to pull tracks
        var retTracks = [];
        for(let g in genre) {
          retTracks.concat(randomizeTracksByGenre(tracks, g.name, g.value/genreTotalVal ));
        }
        resolve(retTracks);
      });
  });
}
randomizeTracksByGenre = function(tracks,genre,precent) {
  var newTracks = [];
  for(let t in tracks) {
    for(let g in t.genre) {
      if(g === genre)
        newTracks.push(t);
    }
  } // newTracks got all tracks from genre
  var numOfTracks = Math.floor(precent*10);
  if(newTracks.length < numOfTracks) {
    return newTracks;
  }
  else {
    for(let i=0; i<numOfTracks; i++) {
      let index = Math.floor(Math.random()*tracks.length);
      let track = tracks[index];
      tracks.slice(index,1);
    }
  }
  var item = items[Math.floor(Math.random()*items.length)];
}
