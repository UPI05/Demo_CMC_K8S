const express = require('express');
const cors = require('cors');
require('dotenv').config()

const app = express();
const mongoose = require('mongoose');

const logger = (req, res, next) => {
  console.log(`Received request to ${req.url}`);
  next();
};

app.use(logger);
app.use(cors());
app.use(express.json());

// Connect to Mongodb
mongoose.connect(`mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWD}@localhost:27017/K8s-demo`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


// APIS

app.get('/hello', (req, res) => {
  res.send('CMC K8s demo!!! By HieuVo.');
});

app.post('/createUser', async (req, res) => {
  const accountSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    name: String,
  });
  const Account = mongoose.model('users', accountSchema);
  const newAccount = new Account(req.body);
  await newAccount.save();
  res.json(newAccount);
})


// Listen
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});