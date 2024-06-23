require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const notFound = require('./middlewares/not-found');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express()


app.use(notFound)
app.use(errorMiddleware)

port = process.env.PORT
app.listen(port, ()=> console.log('server running on', port))