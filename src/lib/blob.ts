import { put, del, list } from "@vercel/blob";

// File size limits
export const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
export const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB

// Accepted MIME types
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

export const ACCEPTED_VIDEO_TYPES = [
  "video/mp4",
  "video/webm",
  "video/quicktime", // .mov
];

export const ACCEPTED_MEDIA_TYPES = [...ACCEPTED_IMAGE_TYPES, ...ACCEPTED_VIDEO_TYPES];

// Type for validation result
export interface ValidationResult {
  valid: boolean;
  error?: string;
}

// Validate file before upload
export function validateFile(file: File, type: "image" | "video" | "media"): ValidationResult {
  const acceptedTypes =
    type === "image"
      ? ACCEPTED_IMAGE_TYPES
      : type === "video"
      ? ACCEPTED_VIDEO_TYPES
      : ACCEPTED_MEDIA_TYPES;

  const maxSize = type === "video" ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;

  // Check MIME type
  if (!acceptedTypes.includes(file.type)) {
    const allowedExtensions =
      type === "image"
        ? "JPEG, PNG, WebP, GIF"
        : type === "video"
        ? "MP4, WebM, MOV"
        : "JPEG, PNG, WebP, GIF, MP4, WebM, MOV";
    return {
      valid: false,
      error: `Invalid file type. Accepted formats: ${allowedExtensions}`,
    };
  }

  // Check file size
  if (file.size > maxSize) {
    const maxSizeMB = maxSize / (1024 * 1024);
    return {
      valid: false,
      error: `File too large. Maximum size is ${maxSizeMB}MB`,
    };
  }

  return { valid: true };
}

// Check if a file is an image
export function isImageFile(file: File): boolean {
  return ACCEPTED_IMAGE_TYPES.includes(file.type);
}

// Check if a file is a video
export function isVideoFile(file: File): boolean {
  return ACCEPTED_VIDEO_TYPES.includes(file.type);
}

export async function uploadImage(
  file: File | Blob,
  filename: string
): Promise<string> {
  const blob = await put(filename, file, {
    access: "public",
  });
  return blob.url;
}

export async function deleteImage(url: string): Promise<void> {
  await del(url);
}

export async function listImages(prefix?: string) {
  const { blobs } = await list({ prefix });
  return blobs;
}

// Helper to get a unique filename
export function generateFilename(originalName: string, type: "image" | "video" = "image"): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const extension = originalName.split(".").pop()?.toLowerCase() || "jpg";
  const folder = type === "video" ? "videos" : "inflatables";
  return `${folder}/${timestamp}-${randomString}.${extension}`;
}
