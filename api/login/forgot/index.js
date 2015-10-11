'use strict';

exports.init = function(req, res){
  if (req.isAuthenticated()) {
    res.redirect(req.user.defaultReturnUrl());
  }
  else {
    res.render('login/forgot/index');
  }
};

exports.send = function(req, res, next){
  console.log('in send');
  
  //res.send('test');

  var workflow = req.app.utility.workflow(req, res);


  workflow.on('validate', function() {
    console.log('in validate');
    if (!req.body.email) {
      workflow.outcome.errfor.email = 'required';
      return workflow.emit('response');
    }

    workflow.emit('generateToken');
  });

  workflow.on('generateToken', function() {
    console.log('in generateToken');
    var crypto = require('crypto');
    crypto.randomBytes(21, function(err, buf) {
      if (err) {
        return next(err);
      }

      var token = buf.toString('hex');
      console.log('before encryptPW');
      req.app.db.models.User.encryptPassword(token, function(err, hash) {
        if (err) {
          return next(err);
        }
        console.log('after encryptPW');
        workflow.emit('patchUser', token, hash);
      });
    });
  });

  workflow.on('patchUser', function(token, hash) {
    var starttime = new Date();
    starttime.setHours(starttime.getHours() + 4);
    // Get the iso time (GMT 0 == UTC 0)
    var isotime = new Date((new Date(starttime)).toISOString() );
    //isotime += 10000000;
    console.log('patchUser: resetPasswordExpires is ' + isotime);
    var conditions = { email: req.body.email.toLowerCase() };
    var fieldsToSet = { 
      resetPasswordToken: hash,
      resetPasswordExpires: isotime //Date.now() + 10000000
    };

     req.app.db.models.User.findOne({
          where: conditions
       })
      .error(function(err) {
        // error callback
        console.log('Couldnt find user: ' + err);
        return workflow.emit('exception', err);
      })
      .success(function(user) {
          console.log('User returned.');
          //console.dir(user);

          if (!user) {
            return workflow.emit('exception', 'couldn\'t find user');
          }

          user.updateAttributes({                            
            resetPasswordToken: fieldsToSet.resetPasswordToken,
            resetPasswordExpires: fieldsToSet.resetPasswordExpires                
          }).then(function(){
              if (err) {
                return workflow.emit('exception', err);
              }

              console.log('Saved user');

              workflow.emit('sendEmail', token, user);
              
            });

          //create Resetpassword record
          /*var resetPW = req.app.db.models.ResetPassword.build({
            userId: userId, 
            resetPasswordToken: fieldsToSet.resetPasswordToken, 
            resetPasswordExpires: fieldsToSet.resetPasswordExpires,
            isUsed: 'N',
          });*/

          // persist an instance
          //user.save()
          
           

      });

  };

  workflow.on('sendEmail', function(token, user) {
    console.log('reached sendEmail: ');
    console.log(req.app.config.smtp.from.name +' <'+ req.app.config.smtp.from.address +'>');
    console.log(req.app.config.smtp.credentials.user + ', ' + req.app.config.smtp.credentials.host);
    req.app.utility.sendmail(req, res, {
      from: req.app.config.smtp.from.name +' <'+ req.app.config.smtp.from.address +'>',
      to: user.email,
      subject: 'Reset your '+ req.app.config.projectName +' password',
      textPath: 'login/forgot/email-text',
      htmlPath: 'login/forgot/email-html',
      locals: {
        username: user.username,
        resetLink: req.protocol +'://'+ req.headers.host +'?u=' + user.email + '&t=' + token, ///api/v1/login/reset/'+ user.email +'/'+ token +'/',
        projectName: req.app.config.projectName
      },
      success: function(message) {
        workflow.emit('response');
      },
      error: function(err) {
        workflow.outcome.errors.push('Error Sending: '+ err);
        workflow.emit('response');
      }
    });
  }); 

  workflow.emit('validate');

  
  
};


/*

*/