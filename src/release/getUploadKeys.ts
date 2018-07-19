import axios from 'axios';
import * as cheerio from 'cheerio';

interface Opts {
  readonly moodleCookies: string;
  readonly moodlePluginId: string;
}

export default async ({ moodleCookies, moodlePluginId }: Opts) => {
  const res = await axios({
    headers: {
      cookie: moodleCookies,
    },
    maxRedirects: 0,
    method: 'GET',
    params: {
      id: moodlePluginId,
    },
    url: 'https://moodle.org/plugins/addversion.php?id=1461',
  });
  const page = cheerio.load(res.data);
  const sessionKey = page('input[name=sesskey]')[0].attribs.value;
  const itemId = page('input[name=version_archive_filemanager]')[0].attribs.value;
  return { sessionKey, itemId };
};
