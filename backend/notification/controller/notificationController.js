var admin = require('firebase-admin');
var serviceAccount = require('../hyravelproject-firebase-adminsdk-fysma-3ae964fc0a.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://hyravelproject.firebaseio.com/',
});

const sendNotification = (req, res, next) => {
  const {token, title, content} = req.body;

  var payload = {
    notification: {
      title: title,
      body: content,
    },
  };

  var options = {
    priority: 'high',
  };

  try {
    admin
      .messaging()
      .sendToDevice(token, payload, options)
      .then((response) => {
        console.log('Successfully sent message:', response);
      })
      .catch((error) => {
        console.log('Error sending message:', error);
      });
  } catch (error) {
    throw new error();
  }

  res.status(201).json({response: token});
};

exports.sendNotification = sendNotification;
// // 'cPhhLCxIQ3OdWJDqkFCgkY:APA91bHhifyOAvrWDzUD72LMZy8ZuyXO6W1HVcgtD-RgqPIYpDl51buwU6cu1zjSwKecRoede2ET2RSmiifSQUO5HOEGdY27m_gAEtuFX4OxNI9UXzn3L3SeOh2XRNpBRD520I8e0pIm';
