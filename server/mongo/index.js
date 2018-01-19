'use strict';

require('dotenv').config();

const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lab36', {useMongoClient:true});

// express server
require('./lib/server.js').start();