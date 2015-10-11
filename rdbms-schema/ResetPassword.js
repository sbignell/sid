'use strict';

exports = module.exports = function(sequelize, DataTypes) {
  var ResetPassword = sequelize.define('ResetPassword', { 	
  	id: { type: Number, default: '', autoIncrement: true },
    userId: { type: Number },
    resetPasswordToken: { type: String, default: '' },
    resetPasswordExpires: { type: Number, default: '' },
    isUsed: { type: String },
    usedTime: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  ResetPassword.validatePassword = function(password, hash, done) {
    var bcrypt = require('bcrypt');
    bcrypt.compare(password, hash, function(err, res) {
      done(err, res);
    });
  };
  

  return ResetPassword;
};
