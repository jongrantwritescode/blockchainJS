const app = require("express")();
const bodyParser = require("body-parser");
const Blockchain = require("./blockchain");
const uuid = require("uuid/v1");

// Consts for rewarding miners
const MINE_REWARD = 12.5;
const DEFAULT_SENDER = "00";

// Bitcoin ledger instance
const bitcoin = new Blockchain();

// Unique address for a particular node
const nodeAddress = uuid()
  .split("-")
  .join("");

// Adding parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Get a copy of the bitcoin ledger
app.get("/blockchain", function(req, res) {
  res.send(bitcoin.ledger());
});

// Post a new transaction. The transaction is pending until a block is created
app.post("/transaction", function(req, res) {
  const blockIndex = bitcoin.createNewTransaction(
    req.body.value,
    req.body.sender,
    req.body.recipient
  );

  res
    .status(200)
    .json({ note: `Transaction will be added in block ${blockIndex}` });
});

// Create new block. New Block is added to the ledger with any pending transactions
app.get("/mine", function(req, res) {
  // Send a little bitcoin to the node that mines the block
  bitcoin.createNewTransaction(MINE_REWARD, DEFAULT_SENDER, nodeAddress);

  // Create the new block and send the block in the result
  const newBlock = bitcoin.createNewBlock();
  res.status(200).json({ note: "Block created!", block: newBlock });
});

// Connect to server
app.listen(5000, function() {
  console.log("Listening on port 5000...");
});
