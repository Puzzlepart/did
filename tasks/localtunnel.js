require('dotenv').config()
const fs = require('fs')
const localtunnel = require('localtunnel')
const log = require('debug')('tasks/localtunnel')

async function setupLocalTunnel(subdomain) {
    fs.writeFileSync('.localtunnel', '')
    if (!subdomain) return
    const tunnel = await localtunnel({ port: process.env.PORT || 9001, subdomain });
    return tunnel.url
}

setupLocalTunnel(process.env.LOCALTUNNEL_SUBDOMAIN).then(url => {
    if (!url) return
    log('Tunnel active at %s', url)
    fs.writeFileSync('.localtunnel', `${url}/auth/callback`)
})