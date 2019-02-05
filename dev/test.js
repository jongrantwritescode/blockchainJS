const Blockchain = require("./blockchain");

const bitcoin = new Blockchain();
bitcoin.createNewBlock(2389, "4732894utrehj", "284uirgo");
bitcoin.createNewBlock(3212, "4732894utrehj", "284uirgo");

console.log(bitcoin);
