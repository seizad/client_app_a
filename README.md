# NexEnt Client App

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.1.

## Build

Run `grunt` for building.

## Running in Developement
Run the following commands to install all dependencies
`npm install`
`bower install`

Next start the json-server to mock the backend api by running the command below from the root of the project (see https://github.com/typicode/json-server for more detail on how this works):

`json-server --watch api/db.json --routes api/routes.json --port 4000`

This will serve our api end-point. You can manually check data served by json-server by going to `localhost:4000/api/name_of_the_json_object`

Then run the application
`grunt serve`

## Adding a new api end point
Change the file `api/db.json` to include the data you need to serve. Ensure that the absolute path used in $http requests is pointing to the json-server.

If you wish to point an api call to an actual end point simply change the $http call to stop using the json-server for that call.

## Viewing Customer/Technican Portal

Depending on the role set for `current_user` is `api/db.json` only certain routes are accessible to the user.
Current available roles are:
- `role.customerPortal` gives you access to `/cp/...`
- `role.technicianPortal` gives you access to `/tp/...`

See https://github.com/Narzerus/angular-permission for detail on how this feature works.

## Project Structure

### Language and Terminology Files

Locale files are places under `api/languages` for developement. In production they need to be served dynamically by the backend. When deployed in production we need to proxy the `api/languages` routes to the backend rather than static files.

## Testing (No Tests Currently)

Running `grunt test` will run the unit tests with karma.

## Bower.json

Note that bootstrap.css is imported manually to only be applied in a namespace to avoid clashing with the dx styles
