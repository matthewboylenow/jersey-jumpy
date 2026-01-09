import { put, del, list } from "@vercel/blob";

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
export function generateFilename(originalName: string): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const extension = originalName.split(".").pop();
  return `inflatables/${timestamp}-${randomString}.${extension}`;
}
