'use strict';

exports = module.exports = function(sequelize, DataTypes) {
  var Person = sequelize.define('Person', { 
    title: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    sex: DataTypes.STRING,
    userId: DataTypes.STRING
  });
 
  return Person;

};
