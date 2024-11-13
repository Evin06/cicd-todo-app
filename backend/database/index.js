const mongoose = require("mongoose");
require('dotenv').config();  // Charge le fichier .env
const { MongoMemoryServer } = require("mongodb-memory-server");

if (process.env.DB_URL && process.env.NODE_ENV === "production") {
  mongoose
    .connect(
      process.env.DB_URL,
    )
    .then(() => {
      console.log("Connected [DB PROD] !");
    })
    .catch((e) => console.log(e));
} else {
  MongoMemoryServer.create().then(async (mongo) => {
    const uri = mongo.getUri();
    await mongoose.connect(uri);
    console.log("Connected [DB test] !");
    console.log("asd: "+process.env.DB_URL)
  });
}
