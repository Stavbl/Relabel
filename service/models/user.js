var mongoose = require('mongoose'),
    schema = mongoose.Schema,
    userSchema = new schema({
      username:  {type:String, index:1, required:true, unique:true},
      password:   {type:String, required:true},
      email:      {type:String, required:true},
      preferences:   [
        {detriot: Number},
        {hard: Number},
        {dance: Number},
        {minimal: Number},
        {classic: Number},
        {house: Number},
        {vgm: Number},
        {hard_acid: Number},
        {electro: Number}
      ],
      playlists: []
    });

var User = mongoose.model('User', userSchema);
module.exports = User;
