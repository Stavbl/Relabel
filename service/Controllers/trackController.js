var express       = require('express'),
    router        = express.Router(),
    userService   = require('../services/user.service');
    trackService  = require('../services/track.service');


// routes
router.post('/getTracksByPref', getTracksByPref);

module.exports = router;

function getTracksByPref(req, res) {
    userService.getPrefById(req.body.id).then((pref)=> {
        trackService.getTracksByPref(pref)
            .then(function (tracks) {
                if (tracks != null) {
                    // successful
                    res.send(tracks);
                } else {
                    // failed
                    res.status(401).send('somthing wrong');
                }
            })
            .catch(function (err) {
                res.status(400).send(err);
            });
      });
}
<<<<<<< HEAD

function addTrackToPlaylist(req, res) {
  let trackId     = req.body.trackId;
  let userId      = req.body.userId;
  let plalistName = req.body.plalistName;
  blablaService.addTrackToPlaylist(trackId, userId, plalistName)
    .then(function(status) {
        res.status(200).json({"status": status});
    })
    .catch(function (err) {
        res.status(400).send(err);
    });
}
=======
>>>>>>> 8b5790f475a365a7d85859c9eb63cb1b4dc0d634
