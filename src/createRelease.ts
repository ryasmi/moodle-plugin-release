import getReleaseNotes from './getReleaseNotes';
import login from './login';
import release from './release';

interface Opts {
  readonly githubRepoSlug: string;
  readonly githubRepoTag: string;
  readonly moodlePassword: string;
  readonly moodlePluginId: string;
  readonly moodleUsername: string;
  readonly pluginVersion: string;
  readonly pluginZipFilePath: string;
}

export default async ({
  githubRepoSlug,
  githubRepoTag,
  moodlePassword,
  moodlePluginId,
  moodleUsername,
  pluginVersion,
  pluginZipFilePath,
}: Opts) => {
  const moodleCookies = await login({
    moodlePassword,
    moodleUsername,
  });
  const releaseNotes = await getReleaseNotes({ githubRepoSlug, githubRepoTag });
  await release({
    githubRepoSlug,
    githubRepoTag,
    moodleCookies,
    moodlePluginId,
    moodleUsername,
    pluginVersion,
    pluginZipFilePath,
    releaseNotes,
  });
};
