Sid
=============

Sid is a node.js server.

In conjunction with his mate Sven, the front-end, they provide you with a node.js example framework that utilises MySQL as the data store http://www.sidandsven.com. Sven is built using javascript, grunt, JST templates, and backbone. Based on jedireza's fantastic [Drywall](http://jedireza.github.io/drywall/) project.


Live Demos
------------

| Platform                    | Username | Password |
| --------------------------- | -------- | -------- |
| http://www.sidandsven.com/  | root     | h@rr0    |


Installation
------------

```bash
$ git clone git@github.com:jedireza/drywall.git && cd ./drywall
$ npm install
$ mv ./config.example.js ./config.js #set mongodb and email credentials
$ grunt
```

Setup
------------

You need a few records in the database to start using the user system.

Run these commands on mongo. __Obviously you should use your email address.__

```js
use drywall; //your mongo db name
```

```js
db.admingroups.insert({ _id: 'root', name: 'Root' });
db.admins.insert({ name: {first: 'Root', last: 'Admin', full: 'Root Admin'}, groups: ['root'] });
var rootAdmin = db.admins.findOne();
db.users.save({ username: 'root', isActive: 'yes', email: 'your@email.addy', roles: {admin: rootAdmin._id} });
var rootUser = db.users.findOne();
rootAdmin.user = { id: rootUser._id, name: rootUser.username };
db.admins.save(rootAdmin);
```

Now just use the reset password feature to set a password.

 - `http://localhost:3000/login/forgot/`
 - Submit your email address and wait a second.
 - Go check your email and get the reset link.
 - `http://localhost:3000/login/reset/:email/:token/`
 - Set a new password.

Login. Customize. Enjoy.

Philosophy
------------

 - Create a website and user system.
 - Write code in a simple and consistent way.
 - Only create minor utilities or plugins to avoid repetitiveness.
 - Find and use good tools.
 - Use tools in their native/default behavior.

Features
------------

 - Basic front end web pages.
 - Contact page has form to email.
 - Login system with forgot password and reset password.
 - Signup and Login with Facebook, Twitter, GitHub, Google and Tumblr.
 - Optional email verification during signup flow.
 - User system with separate account and admin roles.
 - Admin groups with shared permission settings.
 - Administrator level permissions that override group permissions.
 - Global admin quick search component.

Contributing
------------

Contributions welcome. Make sure your code passes `grunt lint` without error.

If you're changing something non-trivial or user-facing, you may want to submit an issue first.

License
------------

MIT

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/d41f60f22a2148e2e2dc6b705cd01481 "githalytics.com")](http://githalytics.com/jedireza/drywall)
