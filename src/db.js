const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected");
};

const propertySchema = new mongoose.Schema({
  name: String,
  location: String,
  valuation: Number,
  ownerWallet: String,
  status: { type: String, default: "CREATED" },
  tokenId: Number,
  txHash: String
});

const Property = mongoose.model("Property", propertySchema);

module.exports = { connectDB, Property };
