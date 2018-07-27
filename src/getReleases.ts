import * as simpleGit from 'simple-git/promise';

const isoDateLength = 10;

export default async (date: string) => {
  const git = simpleGit(process.cwd());
  const logs = await git.log(['--tags']);
  const todaysTags = logs.all.filter((log) => {
    return log.date.slice(0, isoDateLength) === date;
  });
  return todaysTags.length;
};
