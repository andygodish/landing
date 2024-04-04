# landing

This project serves as a simple landing page for my site at [andyg.io](https://andyg.io) with links to other social media pages and a pdf of my resume.

[TAP program presentation material](https://github.com/andygodish/wikijs-storage/blob/main/andygio/landing.md)

## Architecture

This is a simple project written without a modern Nodejs framework, just an index.html file that loads a stylesheet and some vanilla js. 

Nodejs is used to perform unit testing and the associated package.json is read in to present the version of the project. 

## Dev

Use npm's static HTTP server[http-server](https://www.npmjs.com/package/http-server) to serve the static files.

```
http-server ./src
```

The package.json file is read in by the application to read the project version. The production build takes uses the package.json from the root directory. The src directory contains a dummy version of this file for testing and development that mimics the process built into the docker image. 

