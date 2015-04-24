'use strict';

exports = module.exports = function(app, sequelize) {

  app.db.models.User = sequelize.import(__dirname + '/rdbms-schema/User');
  app.db.models.Wine = sequelize.import(__dirname + '/rdbms-schema/Wine');

};