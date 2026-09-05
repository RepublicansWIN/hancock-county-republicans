import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const hasCustomDomain = process.env.GITHUB_PAGES_CUSTOM_DOMAIN === 'true';
const repositoryBasePath = '/hancock-county-republicans';
const basePath = isGitHubPages && !hasCustomDomain ? repositoryBasePath : '';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath,
};

export default nextConfig;
