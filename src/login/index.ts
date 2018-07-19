import getPostLoginCookies from './getPostLoginCookies';
import getPreLoginCookies from './getPreLoginCookies';

interface Opts {
  readonly moodlePassword: string;
  readonly moodleUsername: string;
}

export default async ({ moodleUsername, moodlePassword }: Opts) => {
  const { cfduid, preLoginMoodleSession } = await getPreLoginCookies();
  const { postLoginMoodleSession } = await getPostLoginCookies({
    cfduid,
    moodlePassword,
    moodleUsername,
    preLoginMoodleSession,
  });
  return `__cfduid=${cfduid}; MoodleSession=${postLoginMoodleSession}`;
};
