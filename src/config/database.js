const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://sairammk2022:p8HRbcZATnDgGsx6@namastenode.bqvqxos.mongodb.net/devTinder"
  );
};

module.exports = { connectDB };
