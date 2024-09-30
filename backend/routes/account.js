// backend/routes/account.js
const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account, Transaction } = require('../db');
const { default: mongoose } = require('mongoose');

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    })
});

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;
    const from = req.userId
    // Fetch the accounts within the transaction
    const fromAccount = await Account.findOne({ userId: req.userId }).session(session);
    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!fromAccount || fromAccount.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // Perform the transfer
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);


    // Log the transaction in the Transaction collection
    const trans = new Transaction({
        from: from,
        to: to,
        amount: amount,
        type: 'outgoing'
    });

    //console.log('transaction:', outgoingTransaction)

    // Save the transactions
    await trans.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
});
router.get('/history',authMiddleware, async(req,res)=>{
    try{
        const userId = req.userId

        const transactions = await Transaction.find({
            $or: [{from:userId}, {to:userId}] //This is an array of two conditions. MongoDB will return documents where either condition is true.
        }).sort({date:-1}); 

        res.json(transactions)

    }catch(error){
        res.status(500).json({msg:"Failed"})
    }
})
module.exports = router;