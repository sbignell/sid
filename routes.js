'use strict';

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.set('X-Auth-Required', 'true');
  req.session.returnUrl = req.originalUrl;
  res.redirect('/login/');
}

function ensureAdmin(req, res, next) {
  if (req.user.canPlayRoleOf('admin')) {
    return next();
  }
  res.redirect('/');
}

function ensureAccount(req, res, next) {
  if (req.user.canPlayRoleOf('account')) {
    if (req.app.config.requireAccountVerification) {
      if (req.user.roles.account.isVerified !== 'yes' && !/^\/account\/verification\//.test(req.url)) {
        return res.redirect('/account/verification/');
      }
    }
    return next();
  }
  res.redirect('/');
}

exports = module.exports = function(app, passport) {

  app.post('/api/v1/signup/', require('./api/signup/index').signup);

  //social sign up
  app.post('/signup/social/', require('./api/signup/index').signupSocial);
  app.get('/signup/twitter/', passport.authenticate('twitter', { callbackURL: '/signup/twitter/callback/' }));
  app.get('/signup/twitter/callback/', require('./api/signup/index').signupTwitter);
  app.get('/signup/github/', passport.authenticate('github', { callbackURL: '/signup/github/callback/', scope: ['user:email'] }));
  app.get('/signup/github/callback/', require('./api/signup/index').signupGitHub);
  app.get('/signup/facebook/', passport.authenticate('facebook', { callbackURL: '/signup/facebook/callback/', scope: ['email'] }));
  app.get('/signup/facebook/callback/', require('./api/signup/index').signupFacebook);
  app.get('/signup/google/', passport.authenticate('google', { callbackURL: '/signup/google/callback/', scope: ['profile email'] }));
  app.get('/signup/google/callback/', require('./api/signup/index').signupGoogle);
  app.get('/signup/tumblr/', passport.authenticate('tumblr', { callbackURL: '/signup/tumblr/callback/' }));
  app.get('/signup/tumblr/callback/', require('./api/signup/index').signupTumblr);

  //login/out
  //app.get('/login/', require('./api/login/index').init);
  app.post('/api/v1/login/', require('./api/login/index').login);
  //app.get('/login/forgot/', require('./api/login/forgot/index').init);
  app.post('/api/v1/login/forgot/', require('./api/login/forgot/index').send);
  //app.get('/login/reset/', require('./api/login/reset/index').init);
  app.get('/api/v1/login/reset/:email/:token/', require('./api/login/reset/index').init);
  app.put('/api/v1/login/reset/:email/:token/', require('./api/login/reset/index').set);
  app.get('/logout/', require('./api/logout/index').init);

  //Check if logged in and get user object
  app.get('/api/v1/user/', require('./api/login/index').check);

  //social login
  app.get('/login/twitter/', passport.authenticate('twitter', { callbackURL: '/login/twitter/callback/' }));
  app.get('/login/twitter/callback/', require('./api/login/index').loginTwitter);
  app.get('/login/github/', passport.authenticate('github', { callbackURL: '/login/github/callback/' }));
  app.get('/login/github/callback/', require('./api/login/index').loginGitHub);
  app.get('/login/facebook/', passport.authenticate('facebook', { callbackURL: '/login/facebook/callback/' }));
  app.get('/login/facebook/callback/', require('./api/login/index').loginFacebook);
  app.get('/login/google/', passport.authenticate('google', { callbackURL: '/login/google/callback/', scope: ['profile email'] }));
  app.get('/login/google/callback/', require('./api/login/index').loginGoogle);
  app.get('/login/tumblr/', passport.authenticate('tumblr', { callbackURL: '/login/tumblr/callback/', scope: ['profile email'] }));
  app.get('/login/tumblr/callback/', require('./api/login/index').loginTumblr);

  //admin
  app.all('/admin*', ensureAuthenticated);
  app.all('/admin*', ensureAdmin);
  app.get('/admin/', require('./api/admin/index').init);

  //admin > users
  app.get('/admin/users/', require('./api/admin/users/index').find);
  app.post('/admin/users/', require('./api/admin/users/index').create);
  app.get('/admin/users/:id/', require('./api/admin/users/index').read);
  app.put('/admin/users/:id/', require('./api/admin/users/index').update);
  app.put('/admin/users/:id/password/', require('./api/admin/users/index').password);
  app.put('/admin/users/:id/role-admin/', require('./api/admin/users/index').linkAdmin);
  app.delete('/admin/users/:id/role-admin/', require('./api/admin/users/index').unlinkAdmin);
  app.put('/admin/users/:id/role-account/', require('./api/admin/users/index').linkAccount);
  app.delete('/admin/users/:id/role-account/', require('./api/admin/users/index').unlinkAccount);
  app.delete('/admin/users/:id/', require('./api/admin/users/index').delete);

  //admin > administrators
  app.get('/admin/administrators/', require('./api/admin/administrators/index').find);
  app.post('/admin/administrators/', require('./api/admin/administrators/index').create);
  app.get('/admin/administrators/:id/', require('./api/admin/administrators/index').read);
  app.put('/admin/administrators/:id/', require('./api/admin/administrators/index').update);
  app.put('/admin/administrators/:id/permissions/', require('./api/admin/administrators/index').permissions);
  app.put('/admin/administrators/:id/groups/', require('./api/admin/administrators/index').groups);
  app.put('/admin/administrators/:id/user/', require('./api/admin/administrators/index').linkUser);
  app.delete('/admin/administrators/:id/user/', require('./api/admin/administrators/index').unlinkUser);
  app.delete('/admin/administrators/:id/', require('./api/admin/administrators/index').delete);

  //admin > admin groups
  app.get('/admin/admin-groups/', require('./api/admin/admin-groups/index').find);
  app.post('/admin/admin-groups/', require('./api/admin/admin-groups/index').create);
  app.get('/admin/admin-groups/:id/', require('./api/admin/admin-groups/index').read);
  app.put('/admin/admin-groups/:id/', require('./api/admin/admin-groups/index').update);
  app.put('/admin/admin-groups/:id/permissions/', require('./api/admin/admin-groups/index').permissions);
  app.delete('/admin/admin-groups/:id/', require('./api/admin/admin-groups/index').delete);

  //admin > accounts
  app.get('/admin/accounts/', require('./api/admin/accounts/index').find);
  app.post('/admin/accounts/', require('./api/admin/accounts/index').create);
  app.get('/admin/accounts/:id/', require('./api/admin/accounts/index').read);
  app.put('/admin/accounts/:id/', require('./api/admin/accounts/index').update);
  app.put('/admin/accounts/:id/user/', require('./api/admin/accounts/index').linkUser);
  app.delete('/admin/accounts/:id/user/', require('./api/admin/accounts/index').unlinkUser);
  app.post('/admin/accounts/:id/notes/', require('./api/admin/accounts/index').newNote);
  app.post('/admin/accounts/:id/status/', require('./api/admin/accounts/index').newStatus);
  app.delete('/admin/accounts/:id/', require('./api/admin/accounts/index').delete);

  //admin > statuses
  app.get('/admin/statuses/', require('./api/admin/statuses/index').find);
  app.post('/admin/statuses/', require('./api/admin/statuses/index').create);
  app.get('/admin/statuses/:id/', require('./api/admin/statuses/index').read);
  app.put('/admin/statuses/:id/', require('./api/admin/statuses/index').update);
  app.delete('/admin/statuses/:id/', require('./api/admin/statuses/index').delete);

  //admin > categories
  app.get('/admin/categories/', require('./api/admin/categories/index').find);
  app.post('/admin/categories/', require('./api/admin/categories/index').create);
  app.get('/admin/categories/:id/', require('./api/admin/categories/index').read);
  app.put('/admin/categories/:id/', require('./api/admin/categories/index').update);
  app.delete('/admin/categories/:id/', require('./api/admin/categories/index').delete);

  //admin > search
  app.get('/admin/search/', require('./api/admin/search/index').find);

  //account
  app.all('/account*', ensureAuthenticated);
  app.all('/account*', ensureAccount);
  app.get('/account/', require('./api/account/index').init);

  //account > verification
  app.get('/account/verification/', require('./api/account/verification/index').init);
  app.post('/account/verification/', require('./api/account/verification/index').resendVerification);
  app.get('/account/verification/:token/', require('./api/account/verification/index').verify);

  //account > settings
  app.get('/account/settings/', require('./api/account/settings/index').init);
  app.put('/account/settings/', require('./api/account/settings/index').update);
  app.put('/account/settings/identity/', require('./api/account/settings/index').identity);
  app.put('/account/settings/password/', require('./api/account/settings/index').password);

  //account > settings > social
  app.get('/account/settings/twitter/', passport.authenticate('twitter', { callbackURL: '/account/settings/twitter/callback/' }));
  app.get('/account/settings/twitter/callback/', require('./api/account/settings/index').connectTwitter);
  app.get('/account/settings/twitter/disconnect/', require('./api/account/settings/index').disconnectTwitter);
  app.get('/account/settings/github/', passport.authenticate('github', { callbackURL: '/account/settings/github/callback/' }));
  app.get('/account/settings/github/callback/', require('./api/account/settings/index').connectGitHub);
  app.get('/account/settings/github/disconnect/', require('./api/account/settings/index').disconnectGitHub);
  app.get('/account/settings/facebook/', passport.authenticate('facebook', { callbackURL: '/account/settings/facebook/callback/' }));
  app.get('/account/settings/facebook/callback/', require('./api/account/settings/index').connectFacebook);
  app.get('/account/settings/facebook/disconnect/', require('./api/account/settings/index').disconnectFacebook);
  app.get('/account/settings/google/', passport.authenticate('google', { callbackURL: '/account/settings/google/callback/', scope: ['profile email'] }));
  app.get('/account/settings/google/callback/', require('./api/account/settings/index').connectGoogle);
  app.get('/account/settings/google/disconnect/', require('./api/account/settings/index').disconnectGoogle);
  app.get('/account/settings/tumblr/', passport.authenticate('tumblr', { callbackURL: '/account/settings/tumblr/callback/' }));
  app.get('/account/settings/tumblr/callback/', require('./api/account/settings/index').connectTumblr);
  app.get('/account/settings/tumblr/disconnect/', require('./api/account/settings/index').disconnectTumblr);

  //app

  app.get('/cellar/', require('./api/cellar/index').find);
  app.post('/cellar/', require('./api/cellar/index').create);
  app.delete('/cellar/:id', require('./api/cellar/index').delete);

  //route not found
  app.all('*', require('./api/http/index').http404);
};
