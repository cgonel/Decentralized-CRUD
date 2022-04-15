require("dotenv").config();
const Web3 = require("web3");
const abi = require("../artifacts/abi.json");

const contractAddress="0x6a9D893c1E3d77306d1Ac94BdDc4A26f64B12561"

const web3 = new Web3(new Web3.providers.WebsocketProvider(process.env.WEBSOCKET_URI));
  
web3.eth.accounts.wallet.add("0x" + process.env.PRIVATE_KEY);
  
const CRUDContract = new web3.eth.Contract(abi,contractAddress);

CRUDContract.events
  .PostCreated((error, event) => {
    console.log(event);
  })
  .on("data", function (event) {
    console.log(event); // same results as the optional callback above
  })
  .on("error", console.error);

CRUDContract.events
  .PostUpdated((error, event) => {
    console.log(event);
  })
  .on("data", function (event) {
    console.log(event); // same results as the optional callback above
  })
  .on("error", console.error);

CRUDContract.events
  .PostDeleted((error, event) => {
    console.log(event);
  })
  .on("data", function (event) {
    console.log(event); // same results as the optional callback above
  })
  .on("error", console.error);