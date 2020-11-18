const express = require('express');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

// connectDB();

const app = express();

app.use(fileUpload());

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.send('Hello from Express');
});
console.log(__dirname);

app.post('/upload', (req, res) => {
  if (req.files === null) {
    res.status(400).json({ msg: 'No File Uploaded' });
  }
  const file = req.files.file;
  file.mv(`${__dirname}/client/public/upload/${file.name}`, err => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/upload/${file.name}` });
  });
});

// app.use('/', require('./routes/customers'));
// app.use('/', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server Running in ${process.env.NODE_ENV} Mode On Port ${PORT}`.yellow
      .underline.bold
  )
);
