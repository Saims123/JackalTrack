# JackalTrack

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.1/
## Github 
[https://github.com/Saims123/JackalTrack](https://github.com/Saims123/JackalTrack)

## Setup
Install node_modules needed for the project
```bash
npm i 
```
Ensure that `@angular-cli` are installed locally on the machine

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

All the components which is responsible for displaying and handling the HTML are located under the `components` folder.

All the interfaces and services responsible for data handling, injection and progressing are located under the `services` folder.

## Build
### Normal
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Custom build
Run `npm run build` which already has the --prod flag set to using 'https://i7467177.bucomputing.uk' as the URL

## Deployment to BU-EDAM server 
Once the build is completed, it can be copied over into the EDAM server.

1. Use Filezilla to access to the server, under the user `i7467177`
2. Copy and paste the entire content within ./dist folder into ./public_html folder on the server
3. Test the server by navigating to `https://i7467177.bucomputing.uk`
### Caution
Due to the use of Apache servers, special configuration file called `.htaccess` need to be place inside public_html folder to ensure that every re-route goes to index.html.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests
### DISABLED, as it is not currently compatible with package Microsoft Graph API
Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).


## Documentation
To generate the documentation for this project, run :
```bash
npm run generate-docs
```
After it's finished building , serve the documentation to be view on browser, run :
```bash
npm run serve-docs
```
Then navigate to `http://127.0.0.1:8080` to view the documentation

## Azure Authentication 
This project's authentication are handled by Microsoft Azure, this includes the indivisual routes as well.
Each routes to a different page needs to be registered there in order for the authentication process to work.
They are configured on `https://portal.azure.com/`, under the `Azure Active Directory` sector.

If in the event that there are issues with authentication, then login into the Azure Portal and search under `Application Registration` for "JackalTrack" for troubleshooting.

Further documents regarding on how AAD works : 
[Docs](https://docs.microsoft.com/en-us/azure/active-directory/develop/authentication-scenarios)
## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
