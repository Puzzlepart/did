## Environments

| Environment | Branch/Tag   | CI | Status |
| ----------- | ------------------------------------------------------------  | ------------------------------------------------------------ | ------------------------------------------------------------ |
| [Production](https://did.puzzlepart.com)     | **main** | [Yes](https://portal.azure.com/#@puzzlepart.com/resource/subscriptions/b5e5e285-a57a-4593-a2ef-221dc037ac9f/resourceGroups/pzl-did/providers/Microsoft.Web/sites/didapp/vstscd) | [![Build and deploy to didapp](https://github.com/Puzzlepart/did/actions/workflows/on_push_main_deploy.yml/badge.svg)](https://github.com/Puzzlepart/did/actions/workflows/on_push_main_deploy.yml) |
| [Development (new features)](https://didapp-dev.azurewebsites.net) | **dev** and  **feat/**  | [Yes](https://portal.azure.com/#@puzzlepart.com/resource/subscriptions/b5e5e285-a57a-4593-a2ef-221dc037ac9f/resourceGroups/pzl-did/providers/Microsoft.Web/sites/didapp/slots/dev/vstscd) | [![Build and deploy to didapp/dev](https://github.com/Puzzlepart/did/actions/workflows/on_push_dev_deploy.yml/badge.svg?branch=dev)](https://github.com/Puzzlepart/did/actions/workflows/on_push_dev_deploy.yml) |
| [Staging (pre-prod)](https://didapp-staging.azurewebsites.net) | Release tags | [Yes](https://portal.azure.com/#@puzzlepart.com/resource/subscriptions/b5e5e285-a57a-4593-a2ef-221dc037ac9f/resourceGroups/pzl-did/providers/Microsoft.Web/sites/didapp/slots/staging/vstscd) | [![Build and deploy to didapp/staging](https://github.com/Puzzlepart/did/actions/workflows/on_push_staging_deploy.yml/badge.svg)](https://github.com/Puzzlepart/did/actions/workflows/on_push_staging_deploy.yml) |


