'use strict';

exports = module.exports = function(app, sequelize) {

  app.db.models.Wine = sequelize.import(__dirname + '/rdbms-schema/Wine');

};