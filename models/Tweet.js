var mongoose = require("mongoose");

var tweetSchema = mongoose.Schema({
  content: String, 
  time: {type: Date, default: Date.now},
  creator: {type: mongoose.Schema.Types.ObjectId, ref: 'Creator'}, 
  retweet: {type: mongoose.Schema.Types.ObjectId, ref: 'Creator'}
});

tweetSchema.methods.getDescription = function (callback) {
  return this.creator + '-' + this.tweet;
}

// tweetSchema.path('tweet').validate(function(value) {
//     return value.length > 0 && value.length <= 140;
// }, 'Invalid tweet');

// When we 'require' this model in another file (e.g. routes),
// we specify what we are importing form this file via module.exports.
// Here, we are 'exporting' the mongoose model object created from
// the specified schema.
module.exports = mongoose.model("Tweet", tweetSchema);
