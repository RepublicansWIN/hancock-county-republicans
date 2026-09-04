import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const repositoryBasePath = '/hancock-county-republicans';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: isGitHubPages ? repositoryBasePath : '',
  assetPrefix: isGitHubPages ? repositoryBasePath : '',
};

export default nextConfig;
