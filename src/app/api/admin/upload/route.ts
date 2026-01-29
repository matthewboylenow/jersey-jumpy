import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  uploadImage,
  deleteImage,
  generateFilename,
  validateFile,
  isVideoFile,
} from "@/lib/blob";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const mediaType = formData.get("type") as "image" | "video" | "media" | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file
    const type = mediaType || "media";
    const validation = validateFile(file, type);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Generate filename and upload
    const fileType = isVideoFile(file) ? "video" : "image";
    const filename = generateFilename(file.name, fileType);
    const url = await uploadImage(file, filename);

    return NextResponse.json({
      success: true,
      url,
      type: fileType,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "No URL provided" }, { status: 400 });
    }

    await deleteImage(url);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete file" },
      { status: 500 }
    );
  }
}
