require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const notFound = require('./middlewares/not-found');
const errorMiddleware = require('./middlewares/errorMiddleware');
const authRouter = require('./routes/auth-route');

const app = express()

app.use('/auth', authRouter)
app.use(notFound)
app.use(errorMiddleware)

port = process.env.PORT
app.listen(port, ()=> console.log('server running on', port))