const express = require("express");
const { isAddress } = require("ethers");
const { Property } = require("../db");
const { tokenizeProperty } = require("../services/blockchain");

const router = express.Router();

// POST /properties
router.post("/", async (req, res) => {
  try {
    const { name, location, valuation, ownerWallet } = req.body;

    if (!name || !location || valuation == null || !ownerWallet) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const valNum = Number(valuation);
    if (!Number.isFinite(valNum) || valNum <= 0) {
      return res.status(400).json({ error: "valuation must be a number > 0." });
    }

    if (!isAddress(ownerWallet)) {
      return res.status(400).json({ error: "ownerWallet must be a valid EVM address." });
    }

    const created = await Property.create({
      name,
      location,
      valuation: valNum,
      ownerWallet,
      status: "CREATED",
      tokenId: null,
      txHash: null
    });

    return res.status(201).json(created);
  } catch (err) {
    return res.status(500).json({ error: err.message || "Failed to create property." });
  }
});

// GET /properties/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const record = await Property.findById(id);
    if (!record) return res.status(404).json({ error: "Property not found." });

    return res.json(record);
  } catch (err) {
    // invalid ObjectId or other issues
    return res.status(400).json({ error: "Invalid id." });
  }
});

// POST /properties/:id/tokenize
router.post("/:id/tokenize", async (req, res) => {
  try {
    const { id } = req.params;

    const record = await Property.findById(id);
    if (!record) return res.status(404).json({ error: "Property not found." });

    // Prevent double-minting
    if (record.tokenId || record.txHash) {
      return res.status(409).json({ error: "Property already tokenized." });
    }

    const { tokenId, txHash } = await tokenizeProperty(record);

    record.tokenId = tokenId;
    record.txHash = txHash;
    record.status = "TOKENIZED";

    await record.save();

    return res.json(record);
  } catch (err) {
    return res.status(500).json({ error: err.message || "Tokenization failed." });
  }
});

module.exports = router;
