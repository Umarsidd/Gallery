import { normalizeImageUrl } from './petPresentation';

function extractExtension(url: string, mimeType?: string): string {
  const extensionFromUrl = url.split('.').pop()?.split('?')[0]?.toLowerCase();

  if (extensionFromUrl && extensionFromUrl.length <= 5) {
    return extensionFromUrl;
  }

  if (!mimeType) {
    return 'jpg';
  }

  const [, subtype = 'jpg'] = mimeType.split('/');
  return subtype;
}

export function formatBytes(value: number): string {
  if (value < 1024) {
    return `${value} B`;
  }

  const units = ['KB', 'MB', 'GB'];
  let size = value / 1024;
  let unit = units[0];

  for (let index = 0; index < units.length - 1 && size >= 1024; index += 1) {
    size /= 1024;
    unit = units[index + 1];
  }

  return `${size.toFixed(size >= 10 ? 0 : 1)} ${unit}`;
}

export function slugifyFileName(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'pet';
}

export async function estimateRemoteFileSize(url: string): Promise<number | null> {
  const normalizedUrl = normalizeImageUrl(url);

  try {
    const headResponse = await fetch(normalizedUrl, { method: 'HEAD' });
    const contentLength = headResponse.headers.get('content-length');

    if (contentLength) {
      const parsed = Number(contentLength);

      if (!Number.isNaN(parsed) && parsed > 0) {
        return parsed;
      }
    }
  } catch {
    // Some image hosts reject HEAD requests, so we fall back to GET.
  }

  try {
    const response = await fetch(normalizedUrl);

    if (!response.ok) {
      return null;
    }

    const blob = await response.blob();
    return blob.size;
  } catch {
    return null;
  }
}

export async function downloadRemoteFile(
  url: string,
  fileName: string,
): Promise<void> {
  const normalizedUrl = normalizeImageUrl(url);
  const response = await fetch(normalizedUrl);

  if (!response.ok) {
    throw new Error(`Download failed with status ${response.status}`);
  }

  const blob = await response.blob();
  const blobUrl = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  const extension = extractExtension(normalizedUrl, blob.type);

  anchor.href = blobUrl;
  anchor.download = `${slugifyFileName(fileName)}.${extension}`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(blobUrl);
}
