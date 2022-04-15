require('dotenv').config();
const Web3 = require('web3');
const abi = require("../artifacts/abi.json");

const contractAddress = '0x6a9D893c1E3d77306d1Ac94BdDc4A26f64B12561';

const web3 = new Web3(new Web3.providers.WebsocketProvider(process.env.WEBSOCKET_URI));

web3.eth.accounts.wallet.add("0x" + process.env.PRIVATE_KEY);

const CRUDContract = new web3.eth.Contract(abi, contractAddress);

const id = 5;

// create a post with "Hello World!"
CRUDContract.methods
    .createPost("Hello World!")
    .send({ from: web3.eth.accounts.wallet[0].address, gas: 2000000})

// read the post at id number
// CRUDContract.methods
//     .readPost(id)
//     .call()
//     .then((result) => {
//         console.log(result);
//     })

// update post with id number for "Hello Canada!"
// CRUDContract.methods
//     .updatePost(id, "Hello Canada!")
//     .send({ from: web3.eth.accounts.wallet[0].address, gas: 2000000 })

// delete the post with id number
//     .deletePost(id)
//     .send({ from: web3.eth.accounts.wallet[0].address, gas: 2000000 })