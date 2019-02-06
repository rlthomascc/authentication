const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost/clientPortal/newUser');

const userSessionSchema = new mongoose.Schema({
  userId: { type: Number, default: -1 },
  timestamp: { type: Date, default: Date.now() },
  isDeleted: { type: Boolean, default: false },
});

userSessionSchema.methods.generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);

userSessionSchema.methods.validPassword = password => bcrypt.compareSync(password, this.password);


const userSession = mongoose.model('userSession', userSessionSchema);


const funcs = { userSession };
module.exports = funcs;
