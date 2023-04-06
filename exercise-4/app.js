const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');

const port = 4000;

// express.urlencoded() is a middleware function parsing the incoming requests with the url-encoded payload.
app.use(express.urlencoded({
    // extended:false makes it to act only upon urlencoded body payload.
    extended:false,
}));

// express.json() is a middleware function parsing the incoming requests with json payload.
app.use(express.json());

// cross origin resource sharing.
app.use(cors({
    origin:'https://www.google.com'
}));

// Routing based on the object.
const buddyRoute = require('./routes/buddyRoute');
app.use("/buddy",buddyRoute);

// Final page that'll be loaded making it a page for Error 404!
app.use("/*", (req, res) => {
    res.status(404).send("404 Error! File not found.");
});

// starting the server with the db file.
app.listen(port,() => {
    console.log("Server started running...");
    fs.writeFileSync('./assets/cdw_ace23_buddies.json', JSON.stringify([]));
});