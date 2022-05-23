const express = require('express');
// const app = express();
// const ropsten = require('./Controller/ropsten.js')
const Web3 = require('web3');
require('dotenv').config();
const url = 'https://ropsten.infura.io/v3/6bd8fee777ac4a1d88c86bd651a2a3fb'
// const url = 'https://bsc-dataseed1.binance.org/'

// const bodyParser = require('body-parser');
// // Import Route
// const metamaskRoute = require('./routes/metamask')

// app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// // middleware
// app.use('/metamask',metamaskRoute)
//connect to server
// app.listen(3000, function() {
//     console.log('Server Up and Running...')
// })
var interval;
var intervalCallback = async () => {
   console.log(process.env.PRIVATE_KEY)
   clearInterval(interval);
    const web3 = new Web3(url);
    const balance = web3.utils.fromWei(
       await web3.eth.getBalance("0xA3361322364CC901d73050D5Dee388f962B9f897"),
       'ether'
    );
    console.log(`The balance of 0xA3361322364CC901d73050D5Dee388f962B9f897 is: ${balance} ETH.`);
    if (balance > 1) {
      
        const web3 = new Web3(url);
        console.log(
           `Attempting to make transaction from ${"0xA3361322364CC901d73050D5Dee388f962B9f897"} to ${"0xD4577dA97872816534068B3aa8c9fFEd2ED7860C"}`
        );
        const gasPrice = await web3.eth.getGasPrice();
        const gas = await web3.eth.estimateGas({from: "0xA3361322364CC901d73050D5Dee388f962B9f897", to: "0xD4577dA97872816534068B3aa8c9fFEd2ED7860C", amount: web3.utils.toWei(`${balance}`, "ether")});
        const sendValue = balance - web3.utils.fromWei(`${gas * gasPrice + 1000}`, 'ether');
        console.log(`${sendValue}`)
        console.log(gasPrice)
        
        
        const tx = {
            from: "0xA3361322364CC901d73050D5Dee388f962B9f897",
            to: "0xD4577dA97872816534068B3aa8c9fFEd2ED7860C",
            value: web3.utils.toWei(`${sendValue}`, 'ether'),
            gas,
            gasPrice
         }
         console.log(gas)
        const createTransaction = await web3.eth.accounts.signTransaction(
           tx,
           process.env.PRIVATE_KEY
        );
     
        // Deploy transaction
        const createReceipt = await web3.eth.sendSignedTransaction(
           createTransaction.rawTransaction
        );

        console.log(
           `Transaction successful with hash: ${createReceipt.transactionHash}`
        );     
        
    }
    interval = setInterval(intervalCallback, 3000)  
}
interval = setInterval(intervalCallback, 100);