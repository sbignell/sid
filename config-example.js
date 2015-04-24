'use strict';

exports.port = process.env.PORT || 3001;
exports.mongodb = {
  uri: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost:27017/sid'
};
exports.companyName = 'progress labs';
exports.projectName = 'sid';
exports.systemEmail = 'your@email.addy';
exports.cryptoKey = 'c@B3rnet5auv1gn0n!!';
exports.loginAttempts = {
  forIp: 50,
  forIpAndUser: 7,
  logExpiration: '20m'
};
exports.requireAccountVerification = false;
exports.ssl = {
  key: '/home/ec2-user/yourkey.pem',
  cert: '/home/ec2-user/yourcrt.pem'
};
exports.smtp = {
  from: {
    name: process.env.SMTP_FROM_NAME || exports.projectName,
    address: process.env.SMTP_FROM_ADDRESS || 'your@email.addy'
  },
  credentials: {
    user: process.env.SMTP_USERNAME || 'your@email.addy',
    password: process.env.SMTP_PASSWORD || 'changethis',
    host: process.env.SMTP_HOST || 'your.webmail.server',
    ssl: true
  }
};
exports.mysql = {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  db: 'sid', //process.env.DB,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS
};
exports.oauth = {
  twitter: {
    key: process.env.TWITTER_OAUTH_KEY || '',
    secret: process.env.TWITTER_OAUTH_SECRET || ''
  },
  facebook: {
    key: process.env.FACEBOOK_OAUTH_KEY || '',
    secret: process.env.FACEBOOK_OAUTH_SECRET || ''
  },
  github: {
    key: process.env.GITHUB_OAUTH_KEY || '',
    secret: process.env.GITHUB_OAUTH_SECRET || ''
  },
  google: {
    key: process.env.GOOGLE_OAUTH_KEY || '',
    secret: process.env.GOOGLE_OAUTH_SECRET || ''
  },
  tumblr: {
    key: process.env.TUMBLR_OAUTH_KEY || '',
    secret: process.env.TUMBLR_OAUTH_SECRET || ''
  }
};
