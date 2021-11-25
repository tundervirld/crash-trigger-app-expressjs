# Crash trigger app static site
This app is an example to create errors in JS pressing a button, it uses expressjs. The app is ready to be upload to Azure as a App Service

## Deploy on Azure
Upload your code to azure and test it. You'll need [Azure Cli](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)

### Launchdarly in our APP
This branch work using Launchdarkly to be able to change beaubiour in the app, using Feature Flags/Toogle [see documentation](README-LD.md)
```bash
#login in azure
az login

#set suscription in memory
az account set --subscription [name suscription]

#set resource Goup and location in memory
az config set defaults.group=[name RG] defaults.location=[Name Location eastus2 other]

#upload the app in a windows instance and free plan, show deployment logs and watch it in brorser
az webapp up --name ${PWD##*/} --os-type Windows --sku F1 --logs --launch-browser

#configure env variable to restart app each upload
az webapp config appsettings set --name ${PWD##*/} --settings SCM_DO_BUILD_DURING_DEPLOYMENT=true
```
The app will be abailable in azure in format: `https://[your app name].azurewebsites.net`

> Note: Is good idea delete the resources from Azure to save budget `az webapp delete --name ${PWD##*/}`

### Local development
This example uses Docker. The command `${PWD##*/}` take the folder name to use it, is mandatory stay inside the folder.

Create `.env` file:
```bash
#In LD platform, go to Account Settings -> Project where you created the flag -> and copy Client-side ID
LDCLIENTID=
#In LD platform, Select project and environment to work -> Feature Flags -> Select Feature created -> Copy KEY
FFLDKEY=
```
Up node server local
```bash
#server up
docker run -it --rm  -d \
-p 8090:3000 \
-v $(pwd):/code \
--workdir /code \
--name ${PWD##*/} \
yarnpkg/node-yarn 

#bash in container
docker exec -ti ${PWD##*/} bash

#Install dependencies and upload server in localhost or 0.0.0.0
npm install && npm start
```

##### References:
- [Express app in Azure](https://docs.microsoft.com/en-us/azure/app-service/quickstart-nodejs?pivots=development-environment-vscode&tabs=windows)
- [Upload APP expressjs using azure cli](https://docs.microsoft.com/en-us/azure/developer/javascript/tutorial/tutorial-vscode-azure-cli-node/tutorial-vscode-azure-cli-node-03)