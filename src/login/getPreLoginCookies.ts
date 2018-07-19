import axios from 'axios';
import { OK, SEE_OTHER } from 'http-status-codes';
import * as setCookieParser from 'set-cookie-parser';
import getCookie from './getCookie';

export default async () => {
  const res = await axios({
    maxRedirects: 0,
    method: 'GET',
    url: 'https://moodle.org/login/index.php',
    validateStatus: (status) => {
      return status >= OK && status <= SEE_OTHER;
    },
  });
  const cookies = setCookieParser.parse(res.headers['set-cookie']);
  const cfduid = getCookie(cookies, '__cfduid');
  const preLoginMoodleSession = getCookie(cookies, 'MoodleSession');
  return { cfduid, preLoginMoodleSession };
};
