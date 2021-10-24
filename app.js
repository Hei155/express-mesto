const express = require('express');
const mongoose = require('mongoose');
const login = require('./controllers/login');
const { createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.post('/signin', login);
app.post('/signup', createUser)

app.use('/users', auth, require('./routes/users'));
app.use('/cards', auth, require('./routes/cards'));

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: message })
});

app.listen(PORT, () => {
  console.log('Запущен');
});
