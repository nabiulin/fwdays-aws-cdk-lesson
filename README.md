## Before using
* Rename `env.example` to `.env`. 
* Update `CDK_DEFAULT_ACCOUNT` and `CDK_DEFAULT_REGION` with your configuration 

## Useful commands
* `cdk bootstrap`   application bootstrap

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npx cdk deploy`  deploy this stack to your default AWS account/region

## Frontend
* `cd frontend && npm install` install React app dependencies
* `npm run dev` start the Vite dev server
* `npm run build` build the static assets to the root `dist` folder (used by CDK deployment)
