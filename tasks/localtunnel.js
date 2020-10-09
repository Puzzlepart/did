require('dotenv').config()
const fs = require('fs')
const env = require('!env')
const localtunnel = require('localtunnel')
const log = require('debug')('tasks/localtunnel')

async function setupLocalTunnel(subdomain) {
    fs.writeFileSync('.localtunnel', '')
    if (!subdomain) return
    const tunnel = await localtunnel({ port: env('PORT', 9001), subdomain });
    return tunnel.url
}

setupLocalTunnel(env('LOCALTUNNEL_SUBDOMAIN')).then(url => {
    if(!url) return
    log('Tunnel active at %s', url)
    fs.writeFileSync('.localtunnel', `${url}/auth/callback`)
})