'use strict';

exports = module.exports = function(sequelize, DataTypes) {
  var Account = sequelize.define('Account', { 
    id: { type: Number, default: '', autoIncrement: true },
    name: { type: String, default: '' },
  });
  //Account.plugin(require('./plugins/pagedFind'));
  
   return Account;
};
