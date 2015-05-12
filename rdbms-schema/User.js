'use strict';

exports = module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', { 
    id: { type: Number, default: '', autoIncrement: true },
    username: { type: String, unique: true },
    password: String,
    email: { type: String }, //, unique: true },
    isActive: { type: String },
    isVerified: { type: String, default: '' },
    verificationToken: { type: String, default: '' },
    firstname: { type: String, default: '' },
    middlename: { type: String, default: '' },
    lastname: { type: String, default: '' },
    fullname: { type: String, default: '' },
    company: { type: String, default: '' },
    phone: { type: String, default: '' },
    zip: { type: String, default: '' },
    //status: { type: String, default: '' },
    createdById: { type: String, default: '' },
    createdByName: { type: String, default: '' },
    createdTime: { type: Date, default: Date.now },
    twitterKey: { type: String, default: '' },
    githubKey: { type: String, default: '' },
    facebookKey: { type: String, default: '' },
    googleKey: { type: String, default: '' },
    tumblrKey: { type: String, default: '' },
    deactivatedTime: { type: Date }
  });
  /*User.methods.canPlayRoleOf = function(role) {
    if (role === "admin" && this.adminrole) {
      return true;
    }

    if (role === "account" && this.accountrole) {
      return true;
    }

    return false;
  };
  User.methods.defaultReturnUrl = function() {
    var returnUrl = '/';
    if (this.canPlayRoleOf('account')) {
      returnUrl = '/account/';
    }

    if (this.canPlayRoleOf('admin')) {
      returnUrl = '/admin/';
    }

    return returnUrl;
  };*/
  User.encryptPassword = function(password, done) {
    var bcrypt = require('bcrypt');
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        return done(err);
      }

      bcrypt.hash(password, salt, function(err, hash) {
        done(err, hash);
      });
    });
  };
  User.validatePassword = function(password, hash, done) {
    var bcrypt = require('bcrypt');
    bcrypt.compare(password, hash, function(err, res) {
      done(err, res);
    });
  };
  //User.plugin(require('./plugins/pagedFind'));
 
  
  return User;

};