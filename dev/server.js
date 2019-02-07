const app = require("express")();
const bodyParser = require("body-parser");
const Blockchain = require("./blockchain");

const bitcoin = new Blockchain();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/blockchain", function(req, res) {
  res.send(bitcoin.ledger());
});

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

app.get("/mine", function(req, res) {
  bitcoin.createNewBlock();
  res.send(bitcoin.ledger());
});

app.listen(3000, function() {
  console.log("Listening on port 3000...");
});
