const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const config = require('./config.json');

// Init App
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'build')));

app.post('/api/login', (req, res) => {
  const user = config.users.find(item => {
    return item === req.body.user;
  })
  if (user) {
    const menu = config.menu.filter(item => {
      return !item.allow.indexOf(user);
    });
    res.status(200).json(menu);
  } else {
    res.sendStatus(400);
  }
});

console.log(process.env.NODE_ENV)

const development = process.env.NODE_ENV !== 'production';

if (development) {
  app.listen(3001, () => {
    console.log('server started on port 3001');
  });
} else {
  app.use(express.static('./build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './build/index.html'));
  });

  app.listen(3000, () => {
    console.log('server started on port 3000');
  });
}
