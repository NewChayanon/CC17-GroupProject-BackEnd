require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const notFound = require('./middlewares/not-found');
const errorMiddleware = require('./middlewares/errorMiddleware');
const authRouter = require('./routes/auth-route');
const { authenticate } = require('./middlewares/authenticate');

const app = express()

app.use(cors())
app.use(express.json());
app.use(morgan('dev'));


app.use('/auth', authRouter)
app.use('/user',authenticate)


app.use(notFound)
app.use(errorMiddleware)

port = process.env.PORT
app.listen(port, ()=> console.log('server running on', port))