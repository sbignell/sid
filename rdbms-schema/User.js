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
    roles: { type: String, default: '' },
    phone: { type: String, default: '' },
    createdById: { type: String, default: '' },
    createdByName: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    twitterKey: { type: String, default: '' },
    githubKey: { type: String, default: '' },
    facebookKey: { type: String, default: '' },
    googleKey: { type: String, default: '' },
    tumblrKey: { type: String, default: '' },
    resetPasswordToken: { type: String, default: '' },
    resetPasswordExpires: { type: Date, default: '' },
    deactivatedTime: { type: Date }
  },{
    classMethods: {
      canPlayRoleOf: function(role) {
        if (role === "admin" && this.roles.search("0,")) {
          return true;
        }

        if (role === "account" && this.roles.search("1,")) {
          return true;
        }

        return false;
      },
      defaultReturnUrl: function() {
        var returnUrl = '/';
        if (this.canPlayRoleOf('account')) {
          returnUrl = '/account/';
        }

        if (this.canPlayRoleOf('admin')) {
          returnUrl = '/admin/';
        }

        return returnUrl;
      }
    }

  });
  /*User.canPlayRoleOf = function(role) {
    if (role === "admin" && this.roles.search("0,")) {
      return true;
    }

    if (role === "account" && this.roles.search("1,")) {
      return true;
    }

    return false;
  };
  User.defaultReturnUrl = function() {
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
      console.log('token2: ' + password + ', hash2: ' + hash + ', bcrypt response is: ')
      console.dir(res);
      done(err, res);
    });
  };
  //User.plugin(require('./plugins/pagedFind'));
 
  
  return User;

};