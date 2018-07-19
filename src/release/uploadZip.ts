import axios from 'axios';
import * as FormData from 'form-data';
import readFileAsBuffer from './readFileAsBuffer';

interface Opts {
  readonly itemId: string;
  readonly moodleCookies: string;
  readonly moodlePluginId: string;
  readonly sessionKey: string;
  readonly moodleUsername: string;
  readonly pluginZipFilePath: string;
}

interface Upload {
  readonly file: string;
  readonly id: number;
  readonly url: string;
}

export default async ({
  itemId,
  moodleCookies,
  moodlePluginId,
  sessionKey,
  moodleUsername,
  pluginZipFilePath,
}: Opts) => {
  const zipBuffer = await readFileAsBuffer(pluginZipFilePath);
  const formData = new FormData();
  formData.append('repo_upload_file', zipBuffer as any, 'xapi.zip');
  formData.append('repo_id', '3');
  formData.append('sesskey', sessionKey);
  formData.append('itemid', itemId);
  formData.append('author', moodleUsername);
  formData.append('savepath', '/');
  formData.append('title', 'xapi.zip');
  formData.append('ctx_id', '50');
  formData.append('accepted_types[]', '.zip');
  const res = await axios({
    data: formData,
    headers: {
      'content-type': `multipart/form-data; boundary=${formData.getBoundary()}`,
      cookie: moodleCookies,
      referer: `https://moodle.org/plugins/addversion.php?id=${moodlePluginId}`,
    },
    maxRedirects: 0,
    method: 'POST',
    params: {
      action: 'upload',
    },
    url: 'https://moodle.org/repository/repository_ajax.php',
  });
  const upload: Upload = res.data;
  return upload.id;
};
