'use strict';

exports = module.exports = function(sequelize, DataTypes) {
  var Status = sequelize.define('Status', {   
    id: { type: Number, default: '', autoIncrement: true },
    pivot: { type: String, default: '' },
    name: { type: String, default: '' },
    userId: { type: Number, default: '' },
    createdById: { type: String, default: '' },
    createdByName: { type: String, default: '' },
    createdTime: { type: Date, default: Date.now }
  });
  //statusSchema.plugin(require('./plugins/pagedFind'));
  
  return Status;
};
