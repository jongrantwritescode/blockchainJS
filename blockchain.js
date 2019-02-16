const sha256 = require("sha256");

class Blockchain {
  constructor() {
    this._chain = [];
    this._pendingTransactions = [];

    this.createGenisisBlock();
  }

  createGenisisBlock() {
    this._chain.push(this.block("0", "0", 0));
  }

  createNewBlock() {
    const nonce = this.proofOfWork();
    const hash = this.hashBlock(
      this.previousBlockHash(),
      this.currentBlockData(),
      nonce
    );

    const newBlock = this.block(this.previousBlockHash(), hash, nonce);
    this._chain.push(newBlock);

    this._pendingTransactions = [];

    return newBlock;
  }

  block(previousBlockHash, hash, nonce) {
    return {
      index: this.nextIndex(),
      timestamp: Date.now(),
      transactions: this.pendingTransactions(),
      nonce,
      hash,
      previousBlockHash
    };
  }

  nextIndex() {
    return this._chain.length + 1;
  }

  lastBlock() {
    return this._chain[this._chain.length - 1];
  }

  previousBlockHash() {
    return this.lastBlock().hash;
  }

  currentBlockData() {
    return {
      transactions: this.pendingTransactions(),
      index: this.nextIndex()
    };
  }

  ledger() {
    return {
      chain: this.chain(),
      pendingTransactions: this.pendingTransactions()
    };
  }

  chain() {
    return this._chain.slice();
  }

  pendingTransactions() {
    return this._pendingTransactions.slice();
  }

  createNewTransaction(amount, sender, recipient) {
    this._pendingTransactions.push({
      amount,
      sender,
      recipient
    });

    return this.nextIndex();
  }

  proofOfWork() {
    let nonce = 0;
    let hash = "";
    do {
      hash = this.hashBlock(
        this.previousBlockHash(),
        this.currentBlockData(),
        nonce
      );
      nonce++;
    } while (hash.substring(0, 4) !== "0000");

    return nonce;
  }

  hashBlock(previousBlockHash, currentBlockData, nonce) {
    return sha256(
      previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData)
    );
  }
}

module.exports = Blockchain;
