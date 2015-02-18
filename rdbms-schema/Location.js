'use strict';

exports = module.exports = function(sequelize, DataTypes) {
  var Location = sequelize.define('Location', { 
    name: DataTypes.STRING,
    tripId: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    lat: DataTypes.STRING,
    lng: DataTypes.STRING
  });
 
  return Location;

};