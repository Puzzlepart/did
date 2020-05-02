
const session = require('express-session');
const connectAzureTables = require('connect-azuretables')(session);

const store = connectAzureTables.create({ table: 'Sessions', sessionTimeOut: 360 });

module.exports = session({
    store: store,
    secret: process.env.SESSION_SIGNING_KEY,
    resave: false,
    saveUninitialized: !!process.env.SESSION_SAVE_UNINITIALIZED,
    rolling: true,
});