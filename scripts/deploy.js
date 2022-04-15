require('dotenv').config();
const Web3 = require('web3');
const abi = require('../artifacts/abi.json');
const { bytecode } = require('../artifacts/bytecode.js');

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.URI));

web3.eth.accounts.wallet.add("0x" + process.env.PRIVATE_KEY);

const CRUDContract = new web3.eth.Contract(abi);

CRUDContract
    .deploy({
        data: `0x${bytecode}`
    })
    .estimateGas()
    .then((gas) => {
        CRUDContract.deploy({
            data: `0x${bytecode}`
        })
        .send({
            from: web3.eth.accounts.wallet[0].address,
            gas,
        },
        function (error, transactionHash){
            console.log("error", error);
        })
        .on("receipt", function (receipt){
            console.log("receipt", receipt.contractAddress);
        })
    })
    .catch((e) => {
        console.error(e);
    })