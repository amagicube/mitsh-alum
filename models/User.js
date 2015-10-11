// Data for each User is stored in memory instead of in
// a database. This store (and internal code within the User model)
// could in principle be replaced by a database without needing to
// modify any code in the controller.
var _store = {};
var _notes = [];

// Model code for a User object in the note-taking app.
// Each User object stores a username, password, and collection
// of notes. Each note has some textual content and is specified
// by the owner's username as well as an ID. Each ID is unique
// only within the space of each User, so a (username, noteID)
// uniquely specifies any note.
var User = (function User(_store, _notes) {

  var that = Object.create(User.prototype);

  var userExists = function(username) {
    return _store[username] !== undefined;
  }

  var getUser = function(username) {
    if (userExists(username)) {
      return _store[username];
    }
  }

  var getAllUserNotes = function () {
    return _notes;
  }

  var getUserNote = function (noteId) {
    if (_notes[noteId]) {
      return _notes[noteId];
    } 
  }

  var deleteUserNote = function (username, noteId) {
    if (_notes[noteId] &&  _notes[noteId].creator === username ) {
      delete _notes[noteId];
      return true;
    } 
  }

  that.findByUsername = function (username, callback) {
    if (userExists(username)) {
      callback(null, getUser(username));
    } else {
      callback({ msg : 'No such user!' });
    }
  }

  that.verifyPassword = function(username, candidatepw, callback) {
    if (userExists(username)) {
      var user = getUser(username);
      if (candidatepw === user.password) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    } else {
      callback(null, false);
    }
  }

  that.createNewUser = function (username, password, callback) {
    if (userExists(username)) {
      callback({ taken: true });
    } else {
      _store[username] = { 'username' : username,
                 'password' : password };
      callback(null);
    }
  };

  that.getNote = function(username, noteId, callback) {
    if (userExists(username)) {
      var note = getUserNote(noteId);
      if (note) {
        callback(null, note);
      } else {
        callback({ msg : 'Invalid note.' });
      }
    } else {
      callback({ msg : 'Invalid user.' });
    }
  };

  that.getAllNotes = function(callback) {
    callback(null, getAllUserNotes());
  }

  that.addNote = function(username, note, callback) {
    if (userExists(username)) {
      var user = getUser(username);
      note._id = getAllUserNotes().length;
      getAllUserNotes().push(note);
      callback(null);
    } else {
      callback({ msg : 'Invalid user.' });
    }
  };

  that.removeNote = function(username, noteId, callback) {
    if (userExists(username)) {
      if (deleteUserNote(username, noteId)) {
        callback(null);
      } else {
        callback({ msg : 'Invalid note.' });
      }
    } else {
      callback({ msg : 'Invalid user.' });
    }
  };

  Object.freeze(that);
  return that;

})(_store, _notes);

module.exports = User;
