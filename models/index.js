const path = require('path');

// Load ORM
const Sequelize = require('sequelize');

// To use SQLite data base:
//    DATABASE_URL = sqlite:quiz.sqlite
// To use  Heroku Postgres data base:
//    DATABASE_URL = postgres://user:passwd@host:port/database

const url = process.env.DATABASE_URL || "sqlite:quiz.sqlite";

const sequelize = new Sequelize(url);

// Import the definition of the Quiz Table from quiz.js
const Quiz = sequelize.import(path.join(__dirname, 'quiz'));

// Import the definition of the Tips Table from tip.js
const Tip = sequelize.import(path.join(__dirname,'tip'));

// Import the definition of the Users Table from user.js
const User = sequelize.import(path.join(__dirname,'user'));

// Import the definition of the Attachments Table from attachment.js
const Attachment = sequelize.import(path.join(__dirname,'attachment'));

// Session
sequelize.import(path.join(__dirname,'session'));


// Relation 1-to-N between User and Quiz:
User.hasMany(Quiz, {foreignKey: 'authorId'});
Quiz.belongsTo(User, {as: 'author', foreignKey: 'authorId'});

// Relation 1-to-N between Tip and Quiz:
Tip.belongsTo(Quiz);
Quiz.hasMany(Tip);

// Relation 1-to-1 between Quiz and Attachment
Attachment.hasOne(Quiz);
Quiz.belongsTo(Attachment);

// Relation 1-to-1 between User and Attachment
Attachment.hasOne(User, {foreignKey: 'photoId'});
User.belongsTo(Attachment, {as: "photo", foreignKey: 'photoId'});

// Relation 1-to-1 between Quiz and User:
//    A User has many favourite quizzes.
//    A quiz has many fans (the users who have marked it as favorite)
Quiz.belongsToMany(User, {
    as: 'fans',
    through: 'favourites',
    foreignKey: 'quizId',
    otherKey: 'userId'
});

User.belongsToMany(Quiz, {
    as: 'favouriteQuizzes',
    through: 'favourites',
    foreignKey: 'userId',
    otherKey: 'quizId'
});


module.exports = sequelize;
