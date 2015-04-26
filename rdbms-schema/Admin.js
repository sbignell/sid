'use strict';

//Just have accounts... admins are accounts that are in the admin group

exports = module.exports = function(sequelize, DataTypes) {
  var Admin = sequelize.define('Admin', {   
    id: { type: Number, default: '', autoIncrement: true },
    userId: { type: Number, default: '' },
    username: { type: String, default: '' },
    fullname: { type: String, default: '' },
    firstname: { type: String, default: '' },
    middlename: { type: String, default: '' },
    lastname: { type: String, default: '' },
    groups: [{ type: String, ref: 'AdminGroup' }], //nope.. have a table that does group-member
    permissions: [{ //from groups right?..
      name: String,
      permit: Boolean
    }],
    createdById: { type: String, default: '' },
    createdByName: { type: String, default: '' },
    createdTime: { type: Date, default: Date.now },
    search: [String]
  });
  Admin.methods.hasPermissionTo = function(something) {
    //check group permissions
    var groupHasPermission = false;
    for (var i = 0 ; i < this.groups.length ; i++) {
      for (var j = 0 ; j < this.groups[i].permissions.length ; j++) {
        if (this.groups[i].permissions[j].name === something) {
          if (this.groups[i].permissions[j].permit) {
            groupHasPermission = true;
          }
        }
      }
    }

    //check admin permissions
    for (var k = 0 ; k < this.permissions.length ; k++) {
      if (this.permissions[k].name === something) {
        if (this.permissions[k].permit) {
          return true;
        }

        return false;
      }
    }

    return groupHasPermission;
  };
  Admin.methods.isMemberOf = function(group) {
    for (var i = 0 ; i < this.groups.length ; i++) {
      if (this.groups[i]._id === group) {
        return true;
      }
    }

    return false;
  };
  //adminSchema.plugin(require('./plugins/pagedFind'));

  return Admin;
};
