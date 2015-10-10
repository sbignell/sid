'use strict';

exports = module.exports = function(sequelize, DataTypes) {
  var ResetPassword = sequelize.define('ResetPassword', { 	
  	id: { type: Number, default: '', autoIncrement: true },
    userId: { type: Number },
    resetPasswordToken: { type: String, default: '' },
    resetPasswordExpires: { type: Number, default: '' },
    isUsed: { type: String },
    createdTime: { type: Date, default: Date.now },
    usedTime: { type: Date }
  });
  

  return ResetPassword;
};
