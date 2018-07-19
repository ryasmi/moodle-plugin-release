import axios from 'axios';

interface Opts {
  readonly githubRepoSlug: string;
  readonly githubRepoTag: string;
}

interface Release {
  readonly id: string;
  readonly body: string;
}

export default async ({ githubRepoSlug, githubRepoTag }: Opts) => {
  const res = await axios({
    method: 'GET',
    url: `https://api.github.com/repos/${githubRepoSlug}/releases/tags/${githubRepoTag}`,
  });
  const release: Release = res.data;
  return release.body;
};
