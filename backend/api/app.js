const express = require('express');
const cors = require('cors');
const { HomeRouter, ReacordsRouter }= require('./routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', HomeRouter)
app.use('/records', ReacordsRouter);

module.exports = app;
