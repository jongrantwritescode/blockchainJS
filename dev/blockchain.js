const sha256 = require("sha256");

class Blockchain {
  constructor() {
    this.chain = [];
    this.pendingTransactions = [];

    this.createNewBlock(0, "0", "0");
  }

  createNewBlock(nonce, previousBlockHash, hash) {
    let newBlock = {
      index: this.chain.length + 1,
      timestamp: Date.now(),
      transactions: this.pendingTransactions,
      nonce,
      hash,
      previousBlockHash
    };

    this.pendingTransactions = [];
    this.chain.push(newBlock);

    return newBlock;
  }

  lastBlock() {
    return this.chain[this.chain.length - 1];
  }

  createNewTransaction(amount, sender, recipient) {
    let transaction = {
      amount,
      sender,
      recipient
    };

    this.pendingTransactions.push(transaction);

    return this.lastBlock()["index"] + 1;
  }

  hashBlock(previousBlockHash, currentBlockData, nonce) {
    return sha256(
      previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData)
    );
  }

  proofOfWork(previousBlockHash, currentBlockData) {
    let nonce = 0;
    let hash = "";
    do {
      hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
      nonce++;
    } while (hash.substring(0, 4) !== "0000");

    return nonce;
  }
}

module.exports = Blockchain;
