require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express()

port = process.env.PORT
app.listen(port, ()=> console.log('server running on', port))