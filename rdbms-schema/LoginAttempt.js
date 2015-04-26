'use strict';

exports = module.exports = function(sequelize, DataTypes) {
  var LoginAttempt = sequelize.define('LoginAttempt', { 	
    id: { type: Number, default: '', autoIncrement: true },
    ip: { type: String, default: '' },
    userId: { type: Number, default: '' },
    time: { type: Date, default: Date.now, expires: app.config.loginAttempts.logExpiration }
  });
  

  return LoginAttempt;
};
