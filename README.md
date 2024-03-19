# landing

This project serves as a simple landing page for my site at [andyg.io](https://andyg.io) with links to other social media pages and a pdf of my resume.

## Architecture

This is a simple project written without a modern Nodejs framework, just an index.html file that loads a stylesheet and some vanilla js. 

Nodejs is used to perform unit testing and the associated package.json is read in to present the version of the project. 

## CI

The CI porition of the pipeline uses a public `ubuntu-latest` runner configured with nodejs. 

A public action called go-semantic-release is used to generate the version based on a scan of commit messages that use the ["conventional commits" specification](https://www.conventionalcommits.org/en/v1.0.0/). The calculated version tag is then applied to the `package.json` file in the root directory. 

The `ad-m/github-push-action@master` action is responsible for pushing the automated changes to package.json file. 

If the CI workflow is completed successfully, a build workflow is triggered that builds a new container image using the newly created semantic version as its tag. 

