var Tweet = require('./Tweet');
var Creator = require('./Creator');

// Data for each User is stored in memory instead of in
// a database. This store (and internal code within the User model)
// could in principle be replaced by a database without needing to
// modify any code in the controller.

// Model code for a User object in the note-taking app.
// Each User object stores a username, password, and collection
// of notes. Each note has some textual content and is specified
// by the owner's username as well as an ID. Each ID is unique
// only within the space of each User, so a (username, noteID)
// uniquely specifies any note.
var User = (function User() {

  var that = Object.create(User.prototype);

  var getUser = function (username, callback) {
    Creator.findOne({username: username}, function (err, creator) {
      if (err) {
        callback(err);
      } else {
        callback(null, creator);
      }
    });
  }

  // that.findByUsername = function (username, callback) {
  //   getUser(username, function (err, user) {
  //     if (err) {
  //       callback(err);
  //     } else if (!user) {
  //       callback({ msg : 'Invalid user' });
  //     } else {
  //       callback(null, user);
  //     }
  //   });
  // }

  that.verifyPassword = function(username, candidatepw, callback) {
    getUser(username, function (err, user) {
      if (err) {
        callback(err);
      } else if (!user) {
        callback(null, false);
      } else {
        if (candidatepw === user.password) {
          callback(null, true);
        } else {
          callback(null, false);
        }        
      }
    });
  }

  that.follow = function (username, followee, callback) {
    getUser(username, function (er, user) {
      if (er) {
        callback(er);
      } else if (!user) {
        callback({ msg : 'Invalid user' });
      } else {
        getUser(followee, function (err, fol) {
          if (err) {
            callback(err);
          } else if (!fol) {
            callback({ msg : 'Invalid user' });
          } else {
            if (user.follows.indexOf(fol._id) < 0) {
              user.follows.push(fol._id);
              user.save();
              callback(null);
            } else {
              callback({ msg: 'User already in following list!' })
            }
          }
        });
      }
    });
  }

  that.createNewUser = function (username, password, callback) {
    getUser(username, function (err, user) {
      if (err) {
        callback(err);
      } else if (!user) {
        Creator.create({ 
                        username: username, 
                        password: password, 
                        follows: [],
                        tweets: []
                      }, function (err, record) {
          if (err) {
            callback(err);
          } else {
            callback(null);
          }
        });
      } else {
        callback({ taken: true });
      }
    });
  };

  // that.getTweet = function (username, tweetId, callback) {
  //   getUser(username, function (err, user) {
  //     if (err) {
  //       callback(err);
  //     } else if (!user) {
  //       callback({ msg : 'Invalid user' });
  //     } else {
  //       Tweet.findOne({ _id: tweetId }, function (er, tweet) {
  //         if (er) {
  //           callback(er);
  //         } else {
  //           callback(null, tweet);
  //         }
  //       });
  //     }
  //   });
  // };

  that.getAllTweets = function (username, callback) {
    getUser(username, function (err, user) {
      if (err) {
        callback(err);
      } else if (!user) {
        callback({ msg : 'Invalid user' });
      } else {
        Creator.find()
          .select('tweets username')
          .exec(function (er, followees) {
            if (er) {
              callback(er);
            } else {
              var tweetIds = []
              followees.forEach(function (followee) {
                tweetIds = tweetIds.concat(followee.tweets);
              });
              Tweet.find()
                .where('_id').in(tweetIds)
                .populate('creator')
                .populate('retweet')
                .exec(function (e, tweets){
                  if (e) {
                    callback(e);
                  } else {
                    tweetItems = tweets.map(function (tweet) {
                      return {
                        _id: tweet._id,
                        content: tweet.content,
                        creatorId: tweet.creator._id,
                        creator: tweet.creator.username,
                        retweet: tweet.retweet ? tweet.retweet.username : undefined,
                        userIsAuthor: user.username === tweet.creator.username,
                        time: tweet.time,
                        timeString: tweet.time.toLocaleString()
                      };
                    });
                    callback(null, tweetItems.sort(function (a, b) {
                      return b.time - a.time;
                    }));
                  }
                }
              );
            }
          }
        );
      }
    });
  }

  that.getFollowingTweets = function (username, callback) {
    getUser(username, function (err, user) {
      if (err) {
        callback(err);
      } else if (!user) {
        callback({ msg : 'Invalid user' });
      } else {
        Creator.find()
          .where('_id').in(user.follows)
          .select('tweets username')
          .exec(function (er, followees) {
            if (er) {
              callback(er);
            } else {
              var tweetIds = []
              followees.forEach(function (followee) {
                tweetIds = tweetIds.concat(followee.tweets);
              });
              Tweet.find()
                .where('_id').in(tweetIds)
                .populate('creator')
                .populate('retweet')
                .exec(function (e, tweets){
                  if (e) {
                    callback(e);
                  } else {
                    tweetItems = tweets.map(function (tweet) {
                      return {
                        _id: tweet._id,
                        content: tweet.content,
                        creatorId: tweet.creator._id,
                        creator: tweet.creator.username,
                        retweet: tweet.retweet ? tweet.retweet.username : undefined,
                        userIsAuthor: user.username === tweet.creator.username,
                        time: tweet.time,
                        timeString: tweet.time.toLocaleString()
                      };
                    });
                    callback(null, tweetItems.sort(function (a, b) {
                      return b.time - a.time;
                    }));
                  }
                }
              );
            }
          }
        );
      }
    });
  }

  that.addTweet = function (username, tweetContent, retweetedFrom, callback) {
    getUser(username, function (err, user) {
      if (err) {
        callback(err);
      } else if (!user) {
        callback({ msg : 'Invalid user' });
      } else {
        Tweet.create({ 
                      content: tweetContent, 
                      creator: user._id,
                      retweet: retweetedFrom
                    }, function (err, tweet) {
          if (err) {
            callback(err);
          } else {
            user.tweets.push(tweet._id);
            user.save();
            callback(null);
          }
        });
      }
    });
  };

  that.removeTweet = function (username, tweetId, callback) {
    getUser(username, function (err, user) {
      if (err) {
        callback(err);
      } else if (!user) {
        callback({ msg: 'Invalid user' });
      } else {
        Creator.update(
          {'_id': user._id}, 
          {$pull: {'tweets': tweetId}}, 
          {}, 
          function (er, numAffected) {
            // callback(er);
          }
        );
        Tweet.remove({ '_id': tweetId }, function (e) {
          // callback(e);
        });
        callback(null);
      }
    });
  };

  Object.freeze(that);
  return that;

})();

module.exports = User;
