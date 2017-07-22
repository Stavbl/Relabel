var mongoose = require('mongoose'),
    schema = mongoose.Schema,
    userSchema = new schema({
      username:  {type:String, index:1, required:true, unique:true},
      password:   {type:String, required:true},
      email:      {type:String},
      preferences:   [
        {
          _id : false,
          name: String,
          value: Number
        }
      ],
      playlists: [
        {
          name: String,
          tracks: []
        }
      ]
    });

var User = mongoose.model('User', userSchema);
module.exports = User;
