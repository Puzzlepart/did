const helmet = require('helmet');

module.exports = helmet({
    frameguard: {
        action: 'allow-from',
        domain: 'https://teams.microsoft.com'
    },
    hidePoweredBy: true,
    hsts: helmet.hsts({ maxAge: 5184000 }),
    ieNoOpen: true,
    noSniff: true,
});