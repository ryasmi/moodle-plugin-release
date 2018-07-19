import * as simpleGit from 'simple-git/promise';

export default async (date: string) => {
  const git = simpleGit(process.cwd());
  const logs = await git.log(['--tags']);
  const todaysTags = logs.all.filter((log) => {
    return log.date === date;
  });
  return todaysTags.length;
};
