const express = require('express');

const app = express();
const port = 4000;
app.use(express.json());

app.get('/hello', (req, res) => {
  res.json({ hello: 'world' });
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
