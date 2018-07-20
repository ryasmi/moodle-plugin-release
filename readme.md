# Moodle Plugin Release
> A CLI tool to automatically make releases to the Moodle Plugin Registry.

### Usage
1. Install with `npm i -D -E @ryansmith94/moodle-plugin-release`.
1. Add a script to your `package.json` file using `moodle-plugin-release release -i <pluginId> -z <zipFile>`.
1. Add [Travis deploy step](#travis-ci-deploy-step).

### Requirements
Requires the following environment variables.

- MOODLE_USERNAME
- MOODLE_PASSWORD
- TRAVIS_REPO_SLUG
- TRAVIS_TAG

### Travis CI Deploy Step

```yml
deploy:
  - provider: script
    script: npm install && npm run moodle-plugin-release
    skip_cleanup: true
    on:
      tags: true
      php: 7.1
```
