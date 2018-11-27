# DEPRECATED DUE TO [MOODLE API LIMITATIONS](https://tracker.moodle.org/browse/MDLSITE-1865?focusedCommentId=646150&page=com.atlassian.jira.plugin.system.issuetabpanels%3Acomment-tabpanel#comment-646150)

# Moodle Plugin Release
> A CLI tool to automatically make releases to the Moodle Plugin Registry.

### Usage
1. Install with `npm i -D -E @ryansmith94/moodle-plugin-release`.
1. Add a `moodle-plugin-release` script to your `package.json` file using `moodle-plugin-release release -i <pluginId> -z <zipFile>`.
1. Add [Travis deploy step](#travis-ci-deploy-step).
1. Add [Travis environment variables](#travis-ci-environment-variables).

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

### Travis CI Environment Variables
Requires the following custom environment variables in the Travis project settings.

- `MOODLE_USERNAME` - Your Moodle username.
- `MOODLE_PASSWORD` - Your Moodle password.
- `GH_TOKEN` - [Github Personal Access Token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/).

This tool also uses the following pre-defined environment variables.

- `TRAVIS_REPO_SLUG` - The slug of the Github repository (e.g. `ryansmith94/moodle-plugin-release`).
- `TRAVIS_TAG` - The release tag on Github (e.g. `v1.0.0`).
