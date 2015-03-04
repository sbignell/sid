'use strict';

exports.port = process.env.PORT || 3001;
exports.mongodb = {
  uri: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost:27017/simon'
};
exports.companyName = 'progress labs';
exports.projectName = 'simon';
exports.systemEmail = 'missioncontrol@iamsimon.io';
exports.cryptoKey = 'k3yb0ardc4t';
exports.loginAttempts = {
  forIp: 50,
  forIpAndUser: 7,
  logExpiration: '20m'
};
exports.requireAccountVerification = false;
exports.ssl = {
  key: '/home/ec2-user/eokey.pem',
  cert: '/home/ec2-user/eocrt.pem'
};
exports.smtp = {
  from: {
    name: process.env.SMTP_FROM_NAME || exports.projectName,
    address: process.env.SMTP_FROM_ADDRESS || 'contact@estateops.com'
  },
  credentials: {
    user: process.env.SMTP_USERNAME || 'contact@estateops.com',
    password: process.env.SMTP_PASSWORD || 'iq160e73',
    host: process.env.SMTP_HOST || 'oxmail.registrar-servers.com',
    ssl: true
  }
};
exports.mysql = {
  host: process.env.MYSQL_HOST, //process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT, //process.env.MYSQL_PORT,
  db: 'ss', //process.env.DB,
  username: process.env.MYSQL_USER, //process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASS //process.env.MYSQL_PASSWORD
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
