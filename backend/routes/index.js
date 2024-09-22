//this is the main handler for /api/v1
const express = require('express');
const userRouter = require('./user')
const accountRouter = require('./account');
const router = express.Router();
router.use('/user', userRouter);
router.use('/account', accountRouter);

//you're specifying that the router object should be the single exported value from the module
module.exports = router;