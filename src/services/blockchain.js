const { ethers } = require("ethers");

// For interview prep: start with mock.
// Later we can switch to real contract calls.
async function tokenizeProperty(property) {
  // create a deterministic-ish mock txHash
  const txHash = ethers.id(
    JSON.stringify({
      owner: property.ownerWallet,
      name: property.name,
      t: Date.now()
    })
  );

  // mock tokenId
  const tokenId = Number(BigInt("0x" + txHash.slice(2, 10)));

  return { tokenId, txHash };
}

module.exports = { tokenizeProperty };
