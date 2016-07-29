# sample-app4

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.1.

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.

## Bower.json

Note that bootstrap.css is imported manually to only apply in a namespace to avoid clashing with the dx styles

## Running in Developement
Run the following commands to install all dependencies
`npm install`
`bower install`

Next start the json-server to mock the backend api by running

`json-server --watch api/db.json --routes api/routes.json --port 4000`

This will start a json db that will respond to common http requests

Then run the application
`grunt serve`

## Adding a new api end point
Change the file `api/db.json` to include the data you need to serve
Ensure that the absolute path used in $http requests is pointing to the json-server

If you wish to point an api call to an actual end point simply change the $http call to stop using the json-server for that call.

## Project Structure

### Language and Terminology Files

Locale files are places under `api/languages` for developement. In production they need to be served dynamically by the backend. When deployed in production we need to proxy the `api/languages` routes to the backend rather than static files.
