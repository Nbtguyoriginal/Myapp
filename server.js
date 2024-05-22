const express = require('express');
const requestIp = require('request-ip');
const geoip = require('geoip-lite');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(requestIp.mw());

app.use((req, res, next) => {
    req.clientIp = requestIp.getClientIp(req);
    req.location = geoip.lookup(req.clientIp);
    next();
});

// Dummy route for testing
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
