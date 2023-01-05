const app = require('./app');
const { ConnectToMongo } = require('./db/connection');

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await ConnectToMongo();

    app.listen(PORT, err => {
      if (err) {
        console.error('error at server launch', err);
      }
      console.log('server works at port:', PORT);
    });
  } catch (err) {
    console.error(`failed to launch app with error: ${err.message}`);
  }
};

start();
