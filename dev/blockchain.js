class Blockchain {
  constructor() {
    this.chain = [];
    this.pendingTransactions = [];
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
}

module.exports = Blockchain;
