var assert = require("assert");
var User = require('../models/User');

describe('User', function () {
  describe('getAllNotes()', function () {
    it('should get all notes (empty)', function () {
      User.getAllNotes(function (err, notes) {
        assert.equal(err, null);
        assert.deepEqual(notes, [])
      });
    });
  });

  describe('createNewUser()', function () {
    it('should create user', function () {
      User.createNewUser('aa', 'aapw', function (er) {
        assert.equal(er, null);
      });
    });
    it('should throw when username already exists', function () {
      User.createNewUser('aa', 'bbbbbb', function (er) {
        assert.deepEqual(er, { taken: true });
      });
    });
  });

  describe('findByUserName()', function () {
    it('should retrieve user information', function () {
      User.findByUsername('aa', function (err, user) {
        assert.equal(err, null);
        assert.deepEqual(user, { 'username' : 'aa', 'password' : 'aapw' });
      });
    });
    it('should throw when user doesnt exist', function () {
      User.findByUsername('aslkjdf', function (err, user) {
        assert.deepEqual(err, { msg : 'No such user!' });
        assert.equal(user, null);
      });
    });
  });

  describe('addNote()', function () {
    it('should add note', function () {
      User.addNote('aa', {content: 'hello', creator: 'aa'}, function (er) {
        assert.equal(er, null);
      });
    });

    it('should add throw when user doesnt exist', function () {
      User.addNote('bb', {content: 'hello', creator: 'bb'}, function (er) {
        assert.deepEqual(er, { msg : 'Invalid user.' });
      });
    });
  });

  describe('getNote()', function () {
    it('should return note', function () {
      User.getNote('aa', 0, function (err, note) {
        assert.equal(err, null);
        assert.deepEqual(note, {content: 'hello', creator: 'aa', _id: 0});
      });
    }); 

    it('should throw when getting note that doesnt exist', function () {
      User.getNote('aa', 3, function (err, note) {
        assert.deepEqual(err, { msg : 'Invalid note.' });
      });
    }); 

    it('should throw when getting note of user that doesnt exist', function () {
      User.getNote('cc', 1, function (err, note) {
        assert.deepEqual(err, { msg : 'Invalid user.' });
      });
    }); 

    it('should allow access to notes from both users', function () {
      User.createNewUser('bb', 'bbbb', function (er) {
        assert.equal(er, null);
        User.findByUsername('bb', function (err, user) {
          assert.equal(err, null);
          assert.deepEqual(user, { 'username' : 'bb', 'password' : 'bbbb' });
        });
      });
      User.addNote('bb', {content: 'bbhello', creator: 'bb'}, function (er) {
        assert.equal(er, null);
        User.getNote('bb', 0, function (err, note) {
          assert.equal(err, null);
          assert.deepEqual(note, {content: 'hello', creator: 'aa', _id: 0});
        });
        User.getNote('aa', 0, function (err, note) {
          assert.equal(err, null);
          assert.deepEqual(note, {content: 'hello', creator: 'aa', _id: 0});
        });
      });
    });
  });
  
  describe('removeNote()', function () {
    it('should remove note', function () {
      User.removeNote('bb', 1, function (er) {
        assert.equal(er, null);
        User.getNote('bb', 1, function (err, note) {
          assert.deepEqual(err, { msg : 'Invalid note.' });
          assert.equal(note, undefined);
        });
      });
    });
    it('should throw when removing a note that doesnt exist', function () {
      User.removeNote('bb', 3, function (er) {
        assert.deepEqual(er, { msg : 'Invalid note.' });
      });
    });
    it('should throw when removing a removed note', function () {
      User.removeNote('bb', 1, function (er) {
        assert.deepEqual(er, { msg : 'Invalid note.' });
      });
    });
    it('should not be able to remove notes of another person', function () {
      User.removeNote('bb', 0, function (er) {
        assert.deepEqual(er, { msg : 'Invalid note.' });
      });
    });
  });
  
  describe('getAllNotes()', function () {
    it('should get all items, including empty space for deleted items', function () {
      User.getAllNotes(function (err, notes) {
        assert.equal(err, null)
        assert.deepEqual(notes, [{ content: 'hello', creator: 'aa', _id: 0}, ]);
      });
    });

  });
});