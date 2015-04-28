'use strict';

exports = module.exports = function(sequelize, DataTypes) {
  var Note = sequelize.define('Note', { 	
    id: { type: Number, default: '', autoIncrement: true },
    data: { type: String, default: '' },
    createdById: { type: String, default: '' },
    createdByName: { type: String, default: '' },
    createdTime: { type: Date, default: Date.now }
  });
  
  return Note;
};
