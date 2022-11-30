const express = require('express');
const { API_BASE_URL } = require('./config/constants');
const mensaRoutes = require('./routes/mensa')
const { setFiddlerProxy } = require('./config/fiddler-config');

const app = express()

// Gets Port from environement variable
const port = process.env.PORT || 8080

// Checks if fiddler config should be used
if (process.env.FIDDLER) {
    setFiddlerProxy();
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Mensa routes
app.use(`${API_BASE_URL}/mensas`, mensaRoutes)

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});