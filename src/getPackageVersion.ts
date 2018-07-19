import { readJSON } from 'fs-extra';
import { join as joinPath } from 'path';

export default async () => {
  const packageJson = await readJSON(joinPath(__dirname, '../package.json'));
  return packageJson.version;
};
