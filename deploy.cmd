@if "%SCM_TRACE_LEVEL%" NEQ "4" @echo off

where node 2>nul >nul
IF %ERRORLEVEL% NEQ 0 (
  echo Missing node.js executable, please install node.js, if already installed make sure it can be reached from current environment.
  goto error
)

setlocal enabledelayedexpansion

SET ARTIFACTS=%~dp0%..\artifacts

IF NOT DEFINED DEPLOYMENT_SOURCE (
  SET DEPLOYMENT_SOURCE=%~dp0%.
)

IF NOT DEFINED DEPLOYMENT_TARGET (
  SET DEPLOYMENT_TARGET=%ARTIFACTS%\wwwroot
)

IF NOT DEFINED NEXT_MANIFEST_PATH (
  SET NEXT_MANIFEST_PATH=%ARTIFACTS%\manifest

  IF NOT DEFINED PREVIOUS_MANIFEST_PATH (
    SET PREVIOUS_MANIFEST_PATH=%ARTIFACTS%\manifest
  )
)

IF NOT DEFINED KUDU_SYNC_CMD (
  echo Installing kudusync globally
  call npm install kudusync -g --silent
  IF !ERRORLEVEL! NEQ 0 goto error
  SET KUDU_SYNC_CMD=%appdata%\npm\kuduSync.cmd
)
goto Deployment


:SelectNodeVersion

IF DEFINED KUDU_SELECT_NODE_VERSION_CMD (
  call %KUDU_SELECT_NODE_VERSION_CMD% "%DEPLOYMENT_SOURCE%" "%DEPLOYMENT_TARGET%" "%DEPLOYMENT_TEMP%"
  IF !ERRORLEVEL! NEQ 0 goto error

  IF EXIST "%DEPLOYMENT_TEMP%\__nodeVersion.tmp" (
    SET /p NODE_EXE=<"%DEPLOYMENT_TEMP%\__nodeVersion.tmp"
    IF !ERRORLEVEL! NEQ 0 goto error
  )
  
  IF EXIST "%DEPLOYMENT_TEMP%\__npmVersion.tmp" (
    SET /p NPM_JS_PATH=<"%DEPLOYMENT_TEMP%\__npmVersion.tmp"
    IF !ERRORLEVEL! NEQ 0 goto error
  )

  IF NOT DEFINED NODE_EXE (
    SET NODE_EXE=node
  )

  SET NPM_CMD="!NODE_EXE!" "!NPM_JS_PATH!"
) ELSE (
  SET NPM_CMD=npm
  SET NODE_EXE=node
)

goto :EOF

:Deployment

echo.
echo [1/5] SYNCHRONIZING DEPLOYMENT SOURCE TO DEPLOYMENT TARGET 
echo.

IF /I "%IN_PLACE_DEPLOYMENT%" NEQ "1" (  
  call :ExecuteCmd "%KUDU_SYNC_CMD%" --quiet --perf --from "%DEPLOYMENT_SOURCE%" --to "%DEPLOYMENT_TARGET%" --nextManifest "%NEXT_MANIFEST_PATH%" --previousManifest "%PREVIOUS_MANIFEST_PATH%" --ignore ".git;.hg;.deployment;deploy.cmd;.env.sample;CHANGELOG.md;CONTRIBUTING.md;README.md;.gitignore;.vscode;.github;typedoc-theme"
  IF !ERRORLEVEL! NEQ 0 goto error
)

call :SelectNodeVersion

IF NOT EXIST "%DEPLOYMENT_TARGET%\package.json" (  
echo Missing package.json
 goto error
)


pushd "%DEPLOYMENT_TARGET%"

echo.
echo [2/5] INSTALLING NPM PACKAGES
echo.
call :ExecuteCmd !NPM_CMD! install --production --no-progress --loglevel silent --no-shrinkwrap --no-fund          
IF !ERRORLEVEL! NEQ 0 goto error

echo.
echo [3/5] UPDATING NPM PACKAGES
echo.

call :ExecuteCmd !NPM_CMD! update --production --no-progress --loglevel silent --no-fund 
IF !ERRORLEVEL! NEQ 0 goto error

echo.
echo [4/5] PACKAGING JS
echo.

call :ExecuteCmd !NPM_CMD! run packageClient --loglevel silent
IF !ERRORLEVEL! NEQ 0 goto error

echo.
echo [5/5] PACKAGING CSS
echo.

call :ExecuteCmd !NPM_CMD! run packageStyles --loglevel silent
IF !ERRORLEVEL! NEQ 0 goto error

popd


goto end
:ExecuteCmd
setlocal
set _CMD_=%*
call %_CMD_%
if "%ERRORLEVEL%" NEQ "0" echo Failed exitCode=%ERRORLEVEL%, command=%_CMD_%
exit /b %ERRORLEVEL%

:error
endlocal
echo An error has occurred during web site deployment.
call :exitSetErrorLevel
call :exitFromFunction 2>nul

:exitSetErrorLevel
exit /b 1

:exitFromFunction
()

:end
endlocal
echo Finished successfully.
