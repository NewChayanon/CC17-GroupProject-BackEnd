require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const notFound = require('./middlewares/not-found');
const errorMiddleware = require('./middlewares/errorMiddleware');
const authRouter = require('./routes/auth-route');
const { authenticate } = require('./middlewares/authenticate');
const userRouter = require('./routes/user-route');
const adminRouter = require('./routes/admin-route');
const { isAdmin } = require('./middlewares/isAdmin');

const app = express()

app.use(cors())
app.use(morgan('dev'));
app.use(express.json());


app.use('/auth', authRouter)
app.use('/user',authenticate,userRouter)
app.use('/admin', authenticate,isAdmin,adminRouter)


app.use(notFound)
app.use(errorMiddleware)

port = process.env.PORT || 8888
app.listen(port, ()=> console.log('server running on', port))