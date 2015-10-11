'use strict';

exports = module.exports = function(app, sequelize) {

  app.db.models.User = sequelize.import(__dirname + '/rdbms-schema/User');
  app.db.models.Role = sequelize.import(__dirname + '/rdbms-schema/Role');
  //app.db.models.Admin = sequelize.import(__dirname + '/rdbms-schema/Admin');
  app.db.models.Group = sequelize.import(__dirname + '/rdbms-schema/Group');
  app.db.models.Company = sequelize.import(__dirname + '/rdbms-schema/Company');
  //app.db.models.Category = sequelize.import(__dirname + '/rdbms-schema/Category');
  app.db.models.LoginAttempt = sequelize.import(__dirname + '/rdbms-schema/LoginAttempt');
  //app.db.models.Note = sequelize.import(__dirname + '/rdbms-schema/Note');
  //app.db.models.Status = sequelize.import(__dirname + '/rdbms-schema/Status');
  //app.db.models.ResetPassword = sequelize.import(__dirname + '/rdbms-schema/ResetPassword');
  //app.db.models.StatusLog = sequelize.import(__dirname + '/rdbms-schema/StatusLog');
  
  
  app.db.models.Wine = sequelize.import(__dirname + '/rdbms-schema/Wine');

};