import axios from 'axios';

interface Opts {
  readonly githubRepoSlug: string;
  readonly githubRepoTag: string;
  readonly githubToken: string;
}

interface Release {
  readonly id: string;
  readonly body: string;
}

export default async ({ githubRepoSlug, githubRepoTag, githubToken }: Opts) => {
  const res = await axios({
    headers: {
      Authorization: `token ${githubToken}`,
    },
    method: 'GET',
    url: `https://api.github.com/repos/${githubRepoSlug}/releases/tags/${githubRepoTag}`,
  });
  const release: Release = res.data;
  return release.body;
};
