'use strict';

exports = module.exports = function(app, mongoose) {
  //embeddable docs first
  require('./nosql-schema/Note')(app, mongoose);
  require('./nosql-schema/Status')(app, mongoose);
  require('./nosql-schema/StatusLog')(app, mongoose);
  require('./nosql-schema/Category')(app, mongoose);

  //then regular docs
  require('./nosql-schema/User')(app, mongoose);
  require('./nosql-schema/Admin')(app, mongoose);
  require('./nosql-schema/AdminGroup')(app, mongoose);
  require('./nosql-schema/Account')(app, mongoose);
  require('./nosql-schema/LoginAttempt')(app, mongoose);
};
