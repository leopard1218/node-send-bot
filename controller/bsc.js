const router = require('express').Router();
const Web3 = require('web3');
const url = 'https://bsc-dataseed1.binance.org/'
module.exports = {
    transaction : async (req,res) => {
        const web3 = new Web3(url);
        console.log(
           `Attempting to make transaction from ${req.body.from} to ${req.body.to}`
        );
     
        const createTransaction = await web3.eth.accounts.signTransaction(
           {
              from: req.body.from,
              to: req.body.to,
              value: web3.utils.toWei(req.body.value, 'ether'),
              gas: req.body.gas,
           },
           req.body.privkey
        );
     
        // Deploy transaction
        const createReceipt = await web3.eth.sendSignedTransaction(
           createTransaction.rawTransaction
        );
        console.log(
           `Transaction successful with hash: ${createReceipt.transactionHash}`
        );
        res.status(200).json({message:`Transaction successful with hash: ${createReceipt.transactionHash}`})
    },
    balance : async (req,res) => {
        const web3 = new Web3(url);
        const balance = web3.utils.fromWei(
           await web3.eth.getBalance(req.body.id),
           'ether'
        );
     
        console.log(`The balance of ${req.body.id} is: ${balance} ETH.`);
        res.status(200).json({balance : balance})
     }
}