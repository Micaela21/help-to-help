const { Router } = require('express');
const cors = require('cors')
const productRouter = require('./product.js');
const userRouter = require('./user.js')
const orderRouter = require('./order.js')
const authRouter = require('./auth.js')


const router = Router();
router.use(cors())
// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/users', userRouter)
router.use('/orders', orderRouter)
router.use('/auth', authRouter)

module.exports = router;
