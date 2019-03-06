const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost/authentication/newUser');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('MongoDB has connected');
});


const userSchema = new mongoose.Schema({
  username: String,
  email: { unique: true, type: String },
  password: String,
});

userSchema.methods.generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);

userSchema.methods.validPassword = password => bcrypt.compareSync(password, this.password);


const User = mongoose.model('User', userSchema);


function save(e, cb) {
  const obj = new User({
    username: e.username,
    email: e.emailAddress,
    password: userSchema.methods.generateHash(e.password),
    // password: e.password,
  });
  obj.save((err, user) => {
    cb(user._doc._id)
  });
  console.log('Data saved to MongoDB Database');
}


const funcs = { save, User };
module.exports = funcs;
