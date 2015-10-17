var mongoose = require("mongoose");

var creatorSchema = mongoose.Schema({
  username: String,
  password: String,
  follows: [{type: mongoose.Schema.Types.ObjectId, ref: 'Creator'}],
  tweets: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tweet'}]
});

module.exports = mongoose.model("Creator", creatorSchema);