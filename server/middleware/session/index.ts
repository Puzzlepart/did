
const session = require('express-session');
const connectAzureTables = require('connect-azuretables')(session);

const store = connectAzureTables.create({ table: 'Sessions', sessionTimeOut: 360 });

export default session({
    store: store,
    secret: process.env.SESSION_SIGNING_KEY,
    resave: false,
    saveUninitialized: false,
    rolling: true,
});