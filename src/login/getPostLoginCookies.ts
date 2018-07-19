import axios from 'axios';
import { OK, SEE_OTHER } from 'http-status-codes';
import * as setCookieParser from 'set-cookie-parser';
import getCookie from './getCookie';

interface Opts {
  readonly cfduid: string;
  readonly preLoginMoodleSession: string;
  readonly moodleUsername: string;
  readonly moodlePassword: string;
}

export default async ({ cfduid, preLoginMoodleSession, moodleUsername, moodlePassword }: Opts) => {
  const cookieHeader = `__cfduid=${cfduid}; MoodleSession=${preLoginMoodleSession}`;
  const res = await axios({
    data: `username=${moodleUsername}&password=${moodlePassword}&anchor=`,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      cookie: cookieHeader,
    },
    maxRedirects: 0,
    method: 'POST',
    url: 'https://moodle.org/login/index.php',
    validateStatus: (status) => {
      return status >= OK && status <= SEE_OTHER;
    },
  });
  const cookies = setCookieParser.parse(res.headers['set-cookie']);
  const postLoginMoodleSession = getCookie(cookies, 'MoodleSession');
  return { postLoginMoodleSession };
};
