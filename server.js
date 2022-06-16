const express = require('express');
const dotEnv = require('dotenv');
const cors = require('cors');
const dbConnection = require('./database/connection');

dotEnv.config();
const PORT = process.env.PORT || 4000;
const app = express();

dbConnection();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/image', express.static('upload/images'));
app.use('/profilepic', express.static('upload/profilepics'));

app.use('/api/ks22/image', require('./routes/imageRoutes'));
app.use('/api/ks22/gallery', require('./routes/galleryRoutes'));
app.use('/api/ks22/user', require('./routes/userRoutes'));

app.get('/', (req, res, next) => {
  res.send('Hello!, from Node API Server');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send({
    status: 500,
    message: err.message,
    body: {}
  });
})