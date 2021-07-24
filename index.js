const express = require('express');

require('./utils/Firebase');

const app = express();
const port = 4000;

const usersRoutes = require('./controllers/users');

app.use(express.json());
app.use('/users', usersRoutes);

app.get('/hello', (req, res) => {
  res.json({ hello: 'world' });
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
