const { connectDB } = require("./db");

require("dotenv").config();
const express = require("express");
const cors = require("cors");

const propertiesRouter = require("./routes/properties");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/properties", propertiesRouter);

const PORT = process.env.PORT || 4000;
connectDB();

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
