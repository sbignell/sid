'use strict';

//Isnt this just select * from status where accountid = x? Not required...

exports = module.exports = function(sequelize, DataTypes) {
  var StatusLog = sequelize.define('StatusLog', {   
    id: { type: Number, default: '', autoIncrement: true },
    name: { type: String, default: '' },
    accountId: { type: Number, default: '' },
    createdById: { type: String, default: '' },
    createdByName: { type: String, default: '' },
    createdTime: { type: Date, default: Date.now }
  });
  
  return StatusLog;
};
