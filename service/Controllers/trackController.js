var config = require('config.json');
var express = require('express');
var router = express.Router();
var trackService = require('services/track.service');

// routes
router.post('/getTracksByPref', getTracksByPref);

module.exports = router;

function getTracksByPref(req, res) {
    trackService.getTracksByPref(req.body.id)
        .then(function (tracks) {
            if (tracks) {
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
}
