'use strict';

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  console.log('ensureAuthenticated: false');
  res.set('X-Auth-Required', 'true');
  req.session.returnUrl = req.originalUrl;
  res.redirect('/login/');
}

function ensureAdmin(req, res, next) {
  if (req.user.canPlayRoleOf('admin')) {
    return next();
  }
  console.log('ensureAdmin: false');
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
  console.log('ensureAccount: false');
  res.redirect('/');
}

exports = module.exports = function(app, passport) {

  //signup
  app.post('/api/v1/signup/', require('./api/signup/index').signup);
  app.post('/api/v1/signup/verify/', require('./api/signup/index').signupVerification);

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
  app.post('/api/v1/login/', require('./api/login/index').login);
  app.post('/api/v1/login/forgot/', require('./api/login/forgot/index').send);
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

  //profile
  app.all('/profile*', ensureAuthenticated);
  app.all('/profile*', ensureAccount);
  app.get('/profile/', require('./api/profile/index').init);

  //profile > settings
  app.get('/profile/settings/', require('./api/profile/settings/index').init);
  app.put('/profile/settings/', require('./api/profile/settings/index').update);
  app.put('/profile/settings/identity/', require('./api/profile/settings/index').identity);
  app.put('/profile/settings/password/', require('./api/profile/settings/index').password);

  //profile > settings > social
  app.get('/profile/settings/twitter/', passport.authenticate('twitter', { callbackURL: '/profile/settings/twitter/callback/' }));
  app.get('/profile/settings/twitter/callback/', require('./api/profile/settings/index').connectTwitter);
  app.get('/profile/settings/twitter/disconnect/', require('./api/profile/settings/index').disconnectTwitter);
  app.get('/profile/settings/github/', passport.authenticate('github', { callbackURL: '/profile/settings/github/callback/' }));
  app.get('/profile/settings/github/callback/', require('./api/profile/settings/index').connectGitHub);
  app.get('/profile/settings/github/disconnect/', require('./api/profile/settings/index').disconnectGitHub);
  app.get('/profile/settings/facebook/', passport.authenticate('facebook', { callbackURL: '/profile/settings/facebook/callback/' }));
  app.get('/profile/settings/facebook/callback/', require('./api/profile/settings/index').connectFacebook);
  app.get('/profile/settings/facebook/disconnect/', require('./api/profile/settings/index').disconnectFacebook);
  app.get('/profile/settings/google/', passport.authenticate('google', { callbackURL: '/profile/settings/google/callback/', scope: ['profile email'] }));
  app.get('/profile/settings/google/callback/', require('./api/profile/settings/index').connectGoogle);
  app.get('/profile/settings/google/disconnect/', require('./api/profile/settings/index').disconnectGoogle);
  app.get('/profile/settings/tumblr/', passport.authenticate('tumblr', { callbackURL: '/profile/settings/tumblr/callback/' }));
  app.get('/profile/settings/tumblr/callback/', require('./api/profile/settings/index').connectTumblr);
  app.get('/profile/settings/tumblr/disconnect/', require('./api/profile/settings/index').disconnectTumblr);

  //Wine app
  app.get('/cellar/', require('./api/cellar/index').find);
  app.post('/cellar/', require('./api/cellar/index').create);
  app.delete('/cellar/:id', require('./api/cellar/index').delete);

  //route not found
  app.all('*', require('./api/http/index').http404);
};
