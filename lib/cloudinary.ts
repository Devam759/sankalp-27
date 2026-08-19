/**
 * Cloudinary Media Delivery & Transformation Utility
 * Cloud Name: flufexsc
 */

export const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'flufexsc';
export const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`;

export interface CloudinaryTransformOptions {
  width?: number;
  height?: number;
  crop?: 'fill' | 'fit' | 'limit' | 'thumb' | 'scale' | 'pad';
  quality?: string | number;
  format?: 'auto' | 'webp' | 'avif' | 'png' | 'jpg';
  gravity?: 'auto' | 'face' | 'center';
  fetchFormat?: string;
  extraTransforms?: string;
}

/**
 * Builds an optimized Cloudinary delivery URL for an asset.
 * 
 * Examples:
 *   getCloudinaryUrl('speakers/keynote-1.jpg', { width: 400 })
 *   // => https://res.cloudinary.com/flufexsc/image/upload/f_auto,q_auto,w_400,c_fill/speakers/keynote-1.jpg
 */
export function getCloudinaryUrl(
  pathOrId: string,
  options: CloudinaryTransformOptions = {}
): string {
  if (!pathOrId) return '';

  // If already a full URL that's not Cloudinary, return as is
  if (pathOrId.startsWith('http://') || (pathOrId.startsWith('https://') && !pathOrId.includes('res.cloudinary.com'))) {
    return pathOrId;
  }

  // If already a full Cloudinary URL, return as is
  if (pathOrId.startsWith('https://res.cloudinary.com')) {
    return pathOrId;
  }

  // Clean leading slash
  const cleanPath = pathOrId.startsWith('/') ? pathOrId.slice(1) : pathOrId;

  // Build transformation params
  const transforms: string[] = ['f_auto', 'q_auto'];

  if (options.width) transforms.push(`w_${options.width}`);
  if (options.height) transforms.push(`h_${options.height}`);
  if (options.crop) transforms.push(`c_${options.crop}`);
  if (options.gravity) transforms.push(`g_${options.gravity}`);
  if (options.quality) transforms.push(`q_${options.quality}`);
  if (options.extraTransforms) transforms.push(options.extraTransforms);

  const transformString = transforms.join(',');

  return `${CLOUDINARY_BASE_URL}/${transformString}/${cleanPath}`;
}

/**
 * Custom loader for Next.js <Image> component using Cloudinary
 */
export function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  return getCloudinaryUrl(src, {
    width,
    quality: quality || 'auto',
    format: 'auto',
  });
}
