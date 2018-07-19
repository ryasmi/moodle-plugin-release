import * as program from 'commander';
import createRelease from './createRelease';
import getPackageVersion from './getPackageVersion';
import getPluginVersion from './getPluginVersion';

interface ProgramOpts {
  readonly id: string;
  readonly zip: string;
}

const main = async () => {
  program.version(await getPackageVersion());
  program
    .command('release')
    .option('-i --id <pluginId>', 'ID of the Moodle plugin')
    .option('-z --zip <pluginZip>', 'File path of the Moodle plugin zip file')
    .action(async (opts: ProgramOpts) => {
      const moodleUsername = process.env.MOODLE_USERNAME as string;
      const moodlePassword = process.env.MOODLE_PASSWORD as string;
      const githubRepoSlug = process.env.TRAVIS_REPO_SLUG as string;
      const githubRepoTag = process.env.TRAVIS_TAG as string;

      const moodlePluginId = opts.id as string;
      const pluginZipFilePath = opts.zip as string;

      const pluginVersion = await getPluginVersion();

      await createRelease({
        githubRepoSlug,
        githubRepoTag,
        moodlePassword,
        moodlePluginId,
        moodleUsername,
        pluginVersion,
        pluginZipFilePath,
      });
    });

  program.parse(process.argv);
};

main();
