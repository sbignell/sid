//Use this ile to initialise your tables in MySQL. Then insert data...

CREATE TABLE Users (
id INT NOT NULL AUTO_INCREMENT,
username VARCHAR(40) NOT NULL,
password VARCHAR(40) NOT NULL,
email VARCHAR(40) NOT NULL,
isActive VARCHAR(5) NOT NULL,
isVerified VARCHAR(5) NOT NULL,
verificationToken VARCHAR(40),
firstname VARCHAR(40),
middlename VARCHAR(40) DEFAULT NULL,
lastname VARCHAR(40),
fullname VARCHAR(100),
company VARCHAR(40) NOT NULL,
roles VARCHAR(255),
phone INT(20),
createdById INT NOT NULL,
createdByName VARCHAR(40) NOT NULL,
createdAt TIMESTAMP,
updatedAt TIMESTAMP,
twitterKey VARCHAR(40) DEFAULT NULL,
githubKey VARCHAR(40) DEFAULT NULL,
facebookKey VARCHAR(40) DEFAULT NULL,
googleKey VARCHAR(40) DEFAULT NULL,
tumblrKey VARCHAR(40) DEFAULT NULL,
deactivatedTime TIMESTAMP,
PRIMARY KEY ( id ),
UNIQUE ( email )
);

CREATE TABLE Roles (
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(40) NOT NULL,
company VARCHAR(40) NOT NULL,
createdById INT NOT NULL,
createdByName VARCHAR(40) NOT NULL,
createdAt TIMESTAMP,
updatedAt TIMESTAMP,
PRIMARY KEY ( id )
);

CREATE TABLE Groups (
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(40) NOT NULL,
company VARCHAR(40) NOT NULL,
createdById INT NOT NULL,
createdByName VARCHAR(40) NOT NULL,
createdAt TIMESTAMP,
updatedAt TIMESTAMP,
PRIMARY KEY ( id )
);

CREATE TABLE Companys (
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(40) NOT NULL,
createdById INT NOT NULL,
createdByName VARCHAR(40) NOT NULL,
createdAt TIMESTAMP,
updatedAt TIMESTAMP,
PRIMARY KEY ( id )
);

CREATE TABLE LoginAttempts (
id INT NOT NULL AUTO_INCREMENT,
ip VARCHAR(20) NOT NULL,
userId INT NOT NULL,
time TIMESTAMP,
createdAt TIMESTAMP,
updatedAt TIMESTAMP,
PRIMARY KEY ( id )
);

CREATE TABLE ResetPasswords (
id INT NOT NULL AUTO_INCREMENT,
userId INT NOT NULL,
resetPasswordToken VARCHAR(20) NOT NULL,
resetPasswordExpires TIMESTAMP,
isUsed VARCHAR(5) NOT NULL,
usedTime TIMESTAMP,
createdAt TIMESTAMP,
updatedAt TIMESTAMP,
PRIMARY KEY ( id )
);

CREATE TABLE Wines (
id INT NOT NULL AUTO_INCREMENT,
grape VARCHAR(40) NOT NULL,
estate VARCHAR(40) NOT NULL,
name VARCHAR(80) NOT NULL,
notes VARCHAR(255) NOT NULL,
rating VARCHAR(5) NOT NULL,
createdById INT NOT NULL,
createdByName VARCHAR(40) NOT NULL,
createdAt TIMESTAMP,
updatedAt TIMESTAMP,
PRIMARY KEY ( id )
);

INSERT INTO Users 
( id, username, password, email, isActive, isVerified, company, createdById, createdByName, createdTime )
VALUES
(1, 'root', '1234', 'youremail@address.com', 'yes', 'yes', 'Progress Labs', 1, 'root', now() );
