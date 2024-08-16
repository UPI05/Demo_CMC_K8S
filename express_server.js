const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { createHash } = require('crypto');
var jwt = require('jsonwebtoken');


const app = express();
const mongoose = require('mongoose');
const { exit } = require('process');

const logger = (req, res, next) => {
  console.log(`Received request to ${req.url}`);
  next();
};

app.use(logger);
app.use(cors());
app.use(express.json());

// Connect to Mongodb
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWD}@cluster0.jfvnb.mongodb.net/K8s-demo?retryWrites=true&w=majority&appName=Cluster0`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// DB schema
const accountSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  name: String,
  role: String,
});
const Account = mongoose.model('users', accountSchema);

//



// APIS



app.get('/hello', (req, res) => {
  res.send('CMC K8s demo!!! By HieuVo. Test CICD.');
});

app.post('/login', (req, res) => {
  Account.findOne({ username: req.body.username, password: createHash('sha256').update(req.body.password).digest('hex')}).then(async (doc) => {
    if (!doc) {
      res.json({
        status: 500,
        msg: "Authen failed!"
      });
    } else {
      var role = "user";
      if (doc.role) {
        role = doc.role;
      }
      res.json({
        status: 200,
        msg: "Done!",
        jwt: jwt.sign({ role: role , username: req.body.username }, `${process.env.JWT_SECRET}`, { expiresIn: '1h' }),
      });
    }
  }).catch(err => {
    console.log(err);
    res.json({
      status: 500,
      msg: "ERR!"
    });
  })
});

app.post('/createUser', async (req, res) => {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
  jwt.verify(token, `${process.env.JWT_SECRET}`, function(err, decoded) {
    if (err || decoded.role != "admin" || req.body.role != 'user') {
      res.json({
        status: 500,
        msg: "Not allowed or Authen failed!"
      });
      
      return;
    }
    // Should use OTP, ... to prevent spamming.
    if (req.body.username) {
      Account.find({ username: req.body.username }).then(async (doc) => {
        let acc = req.body;
        acc.role = "user";
        acc.password = createHash('sha256').update(acc.password).digest('hex');
        if (doc.length == 0) {
          const newAccount = new Account(acc);
          await newAccount.save();
          
        } else {
          await Account.updateOne({ username: req.body.username }, acc);
        }
        res.json({
          status: 200,
          msg: "Done!"
        });
      }).catch(err => {
        console.error(err);
        res.json({
          status: 500,
          msg: "ERR!"
        });
      });
    }
  });
  

  
});

app.get('/getUsers', async (req, res) => {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
  jwt.verify(token, `${process.env.JWT_SECRET}`, function(err, decoded) {
    if (err || decoded.role != "admin") {
      res.json({
        status: 500,
        err: JSON.stringify(err),
        msg: "Authen failed!"
      })
    } else {
      Account.find({}).then(async (doc) => {
        res.json({
          status: 200,
          msg: "Done!",
          data: doc
        });
      }).catch(err => {
        console.error(err);
        res.json({
          status: 500,
          msg: "ERR!"
        });
      });
    }
  });
  
  
  
});


app.delete('/deleteUser', async (req, res) => {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
  jwt.verify(token, `${process.env.JWT_SECRET}`, function(err, decoded) {
    if (err || decoded.role != "admin") {
      res.json({
        status: 500,
        msg: "Authen failed!"
      })
    } else {
      Account.deleteOne({ username: req.body.username }).then(async (doc) => {
        res.json({
          status: 200,
          msg: "Done!",
        });
      }).catch(err => {
        console.error(err);
        res.json({
          status: 500,
          msg: "ERR!"
        });
      });
    }
  });
  
  
  
});

app.post('/getUserByUsername', async (req, res) => {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
  jwt.verify(token, `${process.env.JWT_SECRET}`, function(err, decoded) {
    if (err || decoded.role != "admin") {
      res.json({
        status: 500,
        msg: "Authen failed!"
      })
    } else {
      Account.findOne({ username: req.body.username }).then(async (doc) => {
        res.json({
          status: 200,
          msg: "Done!",
          data: doc
        });
      }).catch(err => {
        console.error(err);
        res.json({
          status: 500,
          msg: "ERR!"
        });
      });
    }
  });
  
  
  
})




// Listen
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});