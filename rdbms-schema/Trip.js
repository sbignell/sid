'use strict';

exports = module.exports = function(sequelize, DataTypes) {
  var Trip = sequelize.define('Trip', { 
    name: DataTypes.STRING,
    shortDesc: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    userId: DataTypes.STRING,
    stage0: DataTypes.STRING,
    stage1: DataTypes.STRING,
    stage2: DataTypes.STRING,
    stage3: DataTypes.STRING,
    stage4: DataTypes.STRING,
    cities: DataTypes.STRING,
    countries: DataTypes.STRING,
    notes: DataTypes.STRING
  });
 
  return Trip;

};
