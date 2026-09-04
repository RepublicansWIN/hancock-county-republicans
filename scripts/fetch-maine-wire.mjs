import { mkdir, readFile, writeFile } from 'node:fs/promises';

const feedUrl = 'https://www.themainewire.com/feed/';
const outputPath = new URL('../content/maine-wire.json', import.meta.url);

function decode(value = '') {
  return value
    .replace(/^<!\[CDATA\[|\]\]>$/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;|&#160;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;|&#8220;|&#8221;/g, '"')
    .replace(/&#8216;|&#8217;|&apos;/g, "'")
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8230;/g, '…')
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/\s+/g, ' ')
    .trim();
}

function field(item, tag) {
  return item.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, 'i'))?.[1] ?? '';
}

function findImage(item) {
  const media = item.match(/<media:(?:content|thumbnail)[^>]+url=["']([^"']+)["']/i)?.[1];
  const enclosure = item.match(/<enclosure[^>]+url=["']([^"']+)["'][^>]+type=["']image\//i)?.[1];
  const content = field(item, 'content:encoded');
  const inline = content.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1];
  return decode(media || enclosure || inline || '');
}

try {
  const response = await fetch(feedUrl, {
    headers: { 'user-agent': 'Hancock County Republicans website feed reader' },
  });
  if (!response.ok) throw new Error(`Feed returned ${response.status}`);

  const xml = await response.text();
  const item = xml.match(/<item>([\s\S]*?)<\/item>/i)?.[1];
  if (!item) throw new Error('No article was found in the feed');

  const description = decode(field(item, 'description')).replace(/\s*\[RELATED:[\s\S]*$/i, '').trim();
  const article = {
    source: 'The Maine Wire',
    title: decode(field(item, 'title')),
    url: decode(field(item, 'link')),
    published: new Date(decode(field(item, 'pubDate'))).toISOString(),
    excerpt: description.length > 240 ? `${description.slice(0, 237).trimEnd()}…` : description,
    image: findImage(item),
    feedUrl,
  };

  await mkdir(new URL('../content/', import.meta.url), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(article, null, 2)}\n`, 'utf8');
  console.log(`Updated Maine Wire story: ${article.title}`);
} catch (error) {
  try {
    await readFile(outputPath, 'utf8');
    console.warn(`Maine Wire feed unavailable; keeping the last saved story. ${error.message}`);
  } catch {
    throw error;
  }
}
