import createRelease from './createRelease';
import getUploadKeys from './getUploadKeys';
import uploadZip from './uploadZip';

interface Opts {
  readonly githubRepoSlug: string;
  readonly githubRepoTag: string;
  readonly moodleCookies: string;
  readonly moodlePluginId: string;
  readonly moodleUsername: string;
  readonly pluginVersion: string;
  readonly pluginZipFilePath: string;
  readonly releaseNotes: string;
}

export default async ({
  githubRepoSlug,
  githubRepoTag,
  moodleCookies,
  moodlePluginId,
  moodleUsername,
  pluginVersion,
  pluginZipFilePath,
  releaseNotes,
}: Opts) => {
  const { sessionKey, itemId } = await getUploadKeys({ moodleCookies, moodlePluginId });
  const uploadId = await uploadZip({
    itemId,
    moodleCookies,
    moodlePluginId,
    moodleUsername,
    pluginZipFilePath,
    sessionKey,
  });
  await createRelease({
    githubRepoSlug,
    githubRepoTag,
    itemId,
    moodleCookies,
    moodlePluginId,
    pluginVersion,
    releaseNotes,
    sessionKey,
    uploadId,
  });
};
