'use strict';

exports = module.exports = function(sequelize, DataTypes) {
  var Flight = sequelize.define('Flight', { 
    carrier: DataTypes.STRING,
    confirmationNo: DataTypes.STRING,
    itemId: DataTypes.STRING,
    userId: DataTypes.STRING,
    cities: DataTypes.STRING,
    countries: DataTypes.STRING,
    totalCost: DataTypes.STRING,
    currencyCode: DataTypes.STRING,
    duration: DataTypes.STRING,
    notes: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });
 
  return Flight;

};