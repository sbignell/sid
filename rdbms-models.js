'use strict';

exports = module.exports = function(app, sequelize) {

  sequelize
  .authenticate()
  .complete(function(err) {
    if (!!err) {
      console.log('Sequelize_MySQL: Unable to connect to the database. ' + err);
    } else {
      console.log('Sequelize_MySQL: Connection has been established successfully.');
    }
  });




  require(sequelize.import(__dirname + '/rdbms-schema/Wine')(app, sequelize));

};

/*
// create mysql ORM object
var sequelize = new Sequelize(config.mysql.db, config.mysql.username, config.mysql.password, {
    dialect: 'mysql', // or 'sqlite', 'postgres', 'mariadb'
    host: config.mysql.host,
    port: config.mysql.port
  });

//Setup
sequelize
  .authenticate()
  .complete(function(err) {
    if (!!err) {
      console.log('Sequelize_MySQL: Unable to connect to the database. ' + err);
    } else {
      console.log('Sequelize_MySQL: Connection has been established successfully.');
    }
  });

// load models
var models = [
  'Wine',
  'Trip',
  'Location',
  'Flight'
];
models.forEach(function(model) {
  module.exports[model] = sequelize.import(__dirname + '/rdbms-schema/' + model);
});

*/

  // describe relationships
  /*(function(m) {
    m.Item.belongsTo(m.Trip);
    m.Trip.hasMany(m.Item);
  })(module.exports);*/

  // export connection
  
//module.exports.sequelize = sequelize;