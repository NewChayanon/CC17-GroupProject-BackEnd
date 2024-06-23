require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const notFound = require('./middlewares/not-found');

const app = express()


app.use(notFound)

port = process.env.PORT
app.listen(port, ()=> console.log('server running on', port))