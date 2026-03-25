const TOKEN_PREFIX = '__SAFE_HTML_TOKEN_';

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function extractHref(attributes: string): string | null {
  const match = attributes.match(/\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
  if (!match) return null;
  return (match[1] ?? match[2] ?? match[3] ?? '').trim();
}

function isSafeHref(href: string): boolean {
  const normalized = href.replace(/\s+/g, '').toLowerCase();
  if (!normalized) return false;

  if (normalized.startsWith('/') || normalized.startsWith('#')) {
    return true;
  }

  if (normalized.startsWith('mailto:')) {
    return true;
  }

  try {
    const url = new URL(normalized);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function sanitizeAnchor(attributes: string, rawText: string): string {
  const href = extractHref(attributes);
  const safeText = escapeHtml(rawText.replace(/<[^>]*>/g, ''));

  if (!href || !isSafeHref(href)) {
    return safeText;
  }

  const safeHref = escapeHtml(href);
  const normalizedHref = href.trim().toLowerCase();
  const isExternal = normalizedHref.startsWith('http://') || normalizedHref.startsWith('https://');
  if (isExternal) {
    return `<a href="${safeHref}" target="_blank" rel="noopener noreferrer">${safeText}</a>`;
  }

  return `<a href="${safeHref}">${safeText}</a>`;
}

export function sanitizeRichText(input: string): string {
  if (!input) return '';

  let working = input;
  const tokens: string[] = [];

  const pushToken = (html: string) => {
    const index = tokens.push(html) - 1;
    return `${TOKEN_PREFIX}${index}__`;
  };

  working = working.replace(/<\s*script[\s\S]*?>[\s\S]*?<\s*\/\s*script\s*>/gi, '');
  working = working.replace(/<\s*style[\s\S]*?>[\s\S]*?<\s*\/\s*style\s*>/gi, '');

  working = working.replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi, (_match, attrs: string, text: string) => {
    return pushToken(sanitizeAnchor(attrs ?? '', text ?? ''));
  });

  working = working.replace(/<\s*strong\s*>/gi, () => pushToken('<strong>'));
  working = working.replace(/<\s*\/\s*strong\s*>/gi, () => pushToken('</strong>'));
  working = working.replace(/<\s*em\s*>/gi, () => pushToken('<em>'));
  working = working.replace(/<\s*\/\s*em\s*>/gi, () => pushToken('</em>'));
  working = working.replace(/<\s*br\s*\/?>/gi, () => pushToken('<br>'));

  const escaped = escapeHtml(working);
  return escaped.replace(/__SAFE_HTML_TOKEN_(\d+)__/g, (_match, index: string) => {
    return tokens[Number(index)] ?? '';
  });
}
