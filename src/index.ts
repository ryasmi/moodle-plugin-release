import * as program from 'commander';
import { join as joinPath } from 'path';
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
      try {
        const moodleUsername = process.env.MOODLE_USERNAME as string;
        const moodlePassword = process.env.MOODLE_PASSWORD as string;
        const githubRepoSlug = process.env.TRAVIS_REPO_SLUG as string;
        const githubRepoTag = process.env.TRAVIS_TAG as string;
        const githubToken = process.env.GH_TOKEN as string;

        const moodlePluginId = opts.id;
        const pluginZipFilePath = joinPath(process.cwd(), opts.zip);

        const pluginVersion = await getPluginVersion();

        await createRelease({
          githubRepoSlug,
          githubRepoTag,
          githubToken,
          moodlePassword,
          moodlePluginId,
          moodleUsername,
          pluginVersion,
          pluginZipFilePath,
        });

        // tslint:disable-next-line:no-console
        console.log(`Created ${githubRepoTag} release as ${pluginVersion}`);
      } catch (err) {
        // tslint:disable-next-line:no-console
        console.error(err);
      }
    });

  program.parse(process.argv);
};

main().then(() => {
  return;
}).catch((err) => {
  // tslint:disable-next-line:no-console
  console.error(err);
});
