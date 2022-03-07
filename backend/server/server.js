const express = require('express');
const bodyParser = require('body-parser');
const notificationRoute = require('../notification/routes/notificationRoute');
const paymentRoute = require('../payment/routes/paymentRoute');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/notification', notificationRoute);
app.use('/api/doPayment', paymentRoute);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({message: error.message || 'An unknown error occurred!'});
});

app.listen(5000);
