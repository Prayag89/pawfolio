import { Pet } from '../types';

/**
 * Downloads multiple images as a ZIP file.
 * Uses dynamic imports for jszip and file-saver to keep the
 * initial bundle lean — these libraries are only loaded when
 * the user actually triggers a download.
 */
export async function downloadImages(pets: Pet[]): Promise<void> {
  const JSZip = (await import('jszip')).default;
  const { saveAs } = await import('file-saver');

  const zip = new JSZip();
  const folder = zip.folder('pawfolio-pets');

  if (!folder) throw new Error('Failed to create ZIP folder');

  // Fetch all images concurrently
  const downloads = pets.map(async (pet, index) => {
    try {
      const response = await fetch(pet.url);
      const blob = await response.blob();
      const extension = getExtension(pet.url);
      const safeName = pet.title.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 40);
      folder.file(`${safeName}_${index}.${extension}`, blob);
    } catch (err) {
      console.warn(`Failed to download: ${pet.title}`, err);
    }
  });

  await Promise.all(downloads);

  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, 'pawfolio-pets.zip');
}

/** Extracts file extension from a URL, defaulting to jpg */
function getExtension(url: string): string {
  try {
    const pathname = new URL(url).pathname;
    const ext = pathname.split('.').pop()?.toLowerCase();
    return ext && ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)
      ? ext
      : 'jpg';
  } catch {
    return 'jpg';
  }
}

/**
 * Estimates total file size for selected images.
 * Uses a HEAD request to check Content-Length headers.
 * Falls back to a conservative estimate if headers aren't available.
 */
export async function estimateFileSize(urls: string[]): Promise<number> {
  const sizes = await Promise.all(
    urls.map(async (url) => {
      try {
        const response = await fetch(url, { method: 'HEAD' });
        const length = response.headers.get('content-length');
        return length ? parseInt(length, 10) : 250_000; // ~250KB fallback
      } catch {
        return 250_000;
      }
    })
  );
  return sizes.reduce((sum, size) => sum + size, 0);
}

/** Formats bytes into human-readable string */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}
