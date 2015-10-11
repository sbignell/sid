'use strict';

exports.init = function(req, res){
  if (req.isAuthenticated()) {
    res.redirect(req.user.defaultReturnUrl());
  }
  else {
    res.render('login/reset/index');
  }
};

exports.set = function(req, res){
  var workflow = req.app.utility.workflow(req, res);

  workflow.on('validate', function() {
    if (!req.body.password) {
      workflow.outcome.errfor.password = 'required';
    }

    if (!req.body.confirm) {
      workflow.outcome.errfor.confirm = 'required';
    }

    if (req.body.password !== req.body.confirm) {
      workflow.outcome.errors.push('Passwords do not match.');
    }

    if (workflow.hasErrors()) {
      return workflow.emit('response');
    }

    workflow.emit('findUser');
  });

  workflow.on('findUser', function() {
    console.log('api/login/reset/index: findUser');
    console.log('email: ' + req.params.email);
    var conditions = {
      email: req.params.email
      //resetPasswordExpires: { $gt: Date.now() }
    };
    req.app.db.models.User.findOne({ where: { email: req.params.email } }).then(function(user) {

      if (!user) {
        console.log('no user');
        workflow.outcome.errors.push('Invalid request.');
        return workflow.emit('response');
      }

      //console.dir(user);
      var isonow = new Date().toISOString();
      console.log('isonow is: ' + isonow);

      req.app.db.models.ResetPassword.findOne({
        where: {
          userId: user.id,
          resetPasswordExpires: { $gt: isonow },
          isUsed: 'N'
        } 
      }).then(function(resetpw) {

          if (!resetpw) {
            workflow.outcome.errors.push('Invalid request.');
            return workflow.emit('response');
          }

          console.log('api/login/reset/index: validatePassword');
          req.app.db.models.ResetPassword.validatePassword(req.params.token, resetpw.resetPasswordToken, function(err, isValid) {

            if(err){
              console.log(err);
              return workflow.emit('response');
            }

            if (!isValid) {
              workflow.outcome.errors.push('Invalid request.');
              return workflow.emit('response');
            }

            console.log('api/login/reset/index: validatePassword succeeded');
            workflow.emit('patchUser', user);
          });
      });
    });
  });

  workflow.on('patchUser', function(user) {
    req.app.db.models.User.encryptPassword(req.body.password, function(err, hash) {
      if (err) {
        return workflow.emit('exception', err);
      }

      user.updateAttributes({                            
        password: hash,                           
        resetPasswordToken: ""                        
      });

      user.save.then(function(){
        if (err) {
          return workflow.emit('exception', err);
        }
        console.log('api/login/reset/index: made it to final patchUser');
        workflow.emit('response');

      });

      //var fieldsToSet = { password: hash, resetPasswordToken: '' };
      /*req.app.db.models.User.findByIdAndUpdate(user.id, fieldsToSet, function(err, user) {
        if (err) {
          return workflow.emit('exception', err);
        }
        console.log('api/login/reset/index: made it to final patchUser');
        workflow.emit('response');
      });*/
    });
  });

  workflow.emit('validate');
};
