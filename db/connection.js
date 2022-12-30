const mongoose = require('mongoose');

ConnectToMongo().catch(err => console.log(err));

async function ConnectToMongo() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log('Database connected successfully!');
}

module.exports = { ConnectToMongo };
