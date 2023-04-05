const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');
const logger = require('./logger');
require('dotenv').config();

app.use(express.urlencoded({
    extended:false,
}));
app.use(express.json());
app.use(cors({
    origin:'https://www.google.com'
}));

const buddyRoute = require('./routes/buddy');
app.use("/buddy",buddyRoute);

app.use('/*',(req,res) => {
    res.status(404).send("Page not found.");
    logger.error(`${err.status || 404} - ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
});

app.listen(process.env.PORT,() => {
    console.log("Server started running..." + process.env.PORT);
    fs.writeFileSync('./assets/cdw_ace23_buddies.json', JSON.stringify([]));
    logger.info("Server started & Database file created.");
});

