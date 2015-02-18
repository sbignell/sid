'use strict';

exports = module.exports = function(sequelize) {

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
    'Person',
    'Trip',
    'Location',
    'Flight'
  ];
  models.forEach(function(model) {
    module.exports[model] = sequelize.import(__dirname + '/rdbms-schema/' + model);
  });



  // describe relationships
  /*(function(m) {
    m.Item.belongsTo(m.Trip);
    m.Trip.hasMany(m.Item);
  })(module.exports);*/

  // export connection
  module.exports.sequelize = sequelize;

};
