const crypto = require('crypto')
const fs = require('fs')
const path = require('path')
const { spawnSync } = require('child_process')

const rootDir = path.resolve(__dirname, '..')
const packageJsonPath = path.join(rootDir, 'package.json')
const packageLockPath = path.join(rootDir, 'package-lock.json')
const nodeModulesDir = path.join(rootDir, 'node_modules')
const markerPath = path.join(nodeModulesDir, '.docker-deps.hash')
const requiredModulePath = path.join(nodeModulesDir, 'mongodb', 'package.json')

const hash = crypto
  .createHash('sha256')
  .update(fs.readFileSync(packageJsonPath))
  .update(fs.readFileSync(packageLockPath))
  .digest('hex')

const hasRequiredDependencies = fs.existsSync(requiredModulePath)
const hasCurrentMarker =
  fs.existsSync(markerPath) && fs.readFileSync(markerPath, 'utf8').trim() === hash

if (!hasRequiredDependencies || !hasCurrentMarker) {
  const reason = !hasRequiredDependencies
    ? 'missing required dependencies in node_modules'
    : 'package manifests changed'

  console.log(`[docker-watch] Running npm ci because ${reason}.`)

  let installStatus = 1

  for (const attempt of [1, 2, 3]) {
    const install = spawnSync(
      'npm',
      ['ci', '--no-audit', '--no-fund', '--loglevel=error'],
      {
        cwd: rootDir,
        stdio: 'inherit'
      }
    )

    installStatus = install.status ?? 1

    if (installStatus === 0) {
      break
    }

    if (attempt < 3) {
      console.log(`[docker-watch] npm ci failed on attempt ${attempt}; retrying.`)
    }
  }

  if (installStatus !== 0) {
    process.exit(installStatus)
  }

  fs.mkdirSync(nodeModulesDir, { recursive: true })
  fs.writeFileSync(markerPath, `${hash}\n`)
} else {
  console.log('[docker-watch] Reusing existing node_modules.')
}

const watch = spawnSync('npm', ['run', 'watch'], {
  cwd: rootDir,
  stdio: 'inherit'
})

process.exit(watch.status ?? 0)
