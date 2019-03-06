const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost/authentication/newUser');

const userSessionSchema = new mongoose.Schema({
  email: { type: String, default: '' },
  userId: { type: String, default: '' },
  timestamp: { type: Date, default: Date.now() },
  isDeleted: { type: Boolean, default: false },
});

userSessionSchema.methods.generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);

userSessionSchema.methods.validPassword = password => bcrypt.compareSync(password, this.password);


const userSession = mongoose.model('userSession', userSessionSchema);

function save(e) {
  console.log(e.userID)
  const obj = new userSession({
    email: e.email,
    userId: e.userID,
  });
  obj.save();
  console.log('Data saved to MongoDB Database');
}


const funcs = { userSession, save };
module.exports = funcs;
