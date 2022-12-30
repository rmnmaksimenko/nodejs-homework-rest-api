const mongoose = require('mongoose');

ConnectToMongo().catch(err => {
  console.log('Database connection error');
  console.log(err);
  process.exit(1);
});

async function ConnectToMongo() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log('Database connected successfully!');
}

module.exports = { ConnectToMongo };
