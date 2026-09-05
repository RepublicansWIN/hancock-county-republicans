const githubPagesBasePath =
  process.env.GITHUB_PAGES === 'true' && process.env.GITHUB_PAGES_CUSTOM_DOMAIN !== 'true'
    ? '/hancock-county-republicans'
    : '';

export function publicAsset(path: string) {
  if (!path || /^(?:https?:|data:)/i.test(path)) return path;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${githubPagesBasePath}${normalizedPath}`;
}
