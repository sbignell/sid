'use strict';

exports.find = function(req, res, next){
  var outcome = {};
  var userid = '';
  if(req.user){
    userid = req.user.id;
  }

  req.app.db.models.Wine.findAll({
      where: { createdById: userid },
      attributes: ['id', 'grape', 'estate', 'name', 'notes', 'rating', 'createdById']
   }).then(function(items) {
    
      console.log('Items returned.');
      //console.dir(items);
      
      outcome.results = JSON.stringify(items);

      if (req.xhr) {

        res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
        console.log('sending xhr: ');
        //console.dir(outcome.results);
        res.send(outcome.results);
      }
      else {
        //?
      }
 
  });

};

exports.create = function(req, res, next){
  var workflow = req.app.utility.workflow(req, res);

  workflow.on('validate', function() {
    /*if (!req.body['name.full']) {
      workflow.outcome.errors.push('Please enter a name.');
      return workflow.emit('response');
    }*/

    workflow.emit('createWine');
  });

  workflow.on('createWine', function() {


    var wine = req.app.db.models.Wine.build({
      grape: req.body.grape,
      estate: req.body.estate,
      name: req.body.name,
      notes: req.body.notes,
      rating: req.body.rating,
      createdById: req.body.createdById,
      createdByName: req.body.createdByname
    });
    
    // persist an instance
    wine.save()
      .then(function(newWine) {
        // success callback
        console.log('Saved new wine: ' + newWine.id);
        //console.dir(newWine);
        workflow.outcome.record = newWine;
        return workflow.emit('response');
      });

  });

  workflow.emit('validate');
};

/*exports.update = function(req, res, next){
  var workflow = req.app.utility.workflow(req, res);

  workflow.on('validate', function() {
    if (!req.body.first) {
      workflow.outcome.errfor.first = 'required';
    }

    if (!req.body.last) {
      workflow.outcome.errfor.last = 'required';
    }

    if (workflow.hasErrors()) {
      return workflow.emit('response');
    }

    workflow.emit('patchAccount');
  });

  workflow.on('patchAccount', function() {
    var fieldsToSet = {
      name: {
        first: req.body.first,
        middle: req.body.middle,
        last: req.body.last,
        full: req.body.first +' '+ req.body.last
      },
      company: req.body.company,
      phone: req.body.phone,
      zip: req.body.zip,
      search: [
        req.body.first,
        req.body.middle,
        req.body.last,
        req.body.company,
        req.body.phone,
        req.body.zip
      ]
    };

    req.app.db.models.Account.findByIdAndUpdate(req.params.id, fieldsToSet, function(err, account) {
      if (err) {
        return workflow.emit('exception', err);
      }

      workflow.outcome.account = account;
      return workflow.emit('response');
    });
  });

  workflow.emit('validate');
};*/

exports.delete = function(req, res, next){
  var workflow = req.app.utility.workflow(req, res);
  var Wine = req.app.db.models.Wine;

  workflow.on('validate', function() {
    /*if (!req.user.roles.admin.isMemberOf('root')) {
      workflow.outcome.errors.push('You may not delete accounts.');
      return workflow.emit('response');
    }*/

    workflow.emit('deleteWine');
  });

  workflow.on('deleteWine', function(err) {
    /*req.app.db.models.Account.findByIdAndRemove(req.params.id, function(err, account) {
      if (err) {
        return workflow.emit('exception', err);
      }

      workflow.outcome.account = account;
      workflow.emit('response');
    });*/

    var obj = Wine.find({ where: {id: req.params.id} })
    .then(function(wine) {
      // success callback
      console.log('Found wine: ');
      console.log(JSON.stringify(wine));


         wine.destroy()
         .then(function() {
            // now i'm gone :)
           console.log('Deleted wine');
           workflow.emit('response');
        });

    });


  });

  workflow.emit('validate');
};
