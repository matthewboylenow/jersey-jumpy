"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { X, Loader2, AlertCircle, Video, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ACCEPTED_IMAGE_TYPES,
  ACCEPTED_VIDEO_TYPES,
  MAX_IMAGE_SIZE,
  MAX_VIDEO_SIZE,
} from "@/lib/blob";

interface MediaUploadProps {
  value?: string;
  onChange: (url: string | undefined) => void;
  type?: "image" | "video" | "media";
  label?: string;
  required?: boolean;
  className?: string;
}

export function MediaUpload({
  value,
  onChange,
  type = "image",
  label,
  required = false,
  className,
}: MediaUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isVideo = value?.match(/\.(mp4|webm|mov)$/i) || type === "video";
  const acceptedTypes =
    type === "image"
      ? ACCEPTED_IMAGE_TYPES.join(",")
      : type === "video"
      ? ACCEPTED_VIDEO_TYPES.join(",")
      : [...ACCEPTED_IMAGE_TYPES, ...ACCEPTED_VIDEO_TYPES].join(",");

  const maxSize = type === "video" ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;

  const handleUpload = useCallback(
    async (file: File) => {
      setError(null);
      setUploading(true);

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", type);

        const response = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Upload failed");
        }

        onChange(data.url);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setUploading(false);
      }
    },
    [type, onChange]
  );

  const handleDelete = useCallback(async () => {
    if (!value) return;

    setError(null);
    setUploading(true);

    try {
      const response = await fetch("/api/admin/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: value }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Delete failed");
      }

      onChange(undefined);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setUploading(false);
    }
  }, [value, onChange]);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleUpload(file);
      }
      // Reset input so same file can be selected again
      e.target.value = "";
    },
    [handleUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files?.[0];
      if (file) {
        handleUpload(file);
      }
    },
    [handleUpload]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const maxSizeMB = maxSize / (1024 * 1024);
  const acceptedFormats =
    type === "image"
      ? "JPEG, PNG, WebP, GIF"
      : type === "video"
      ? "MP4, WebM, MOV"
      : "Images or Videos";

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="text-sm font-medium text-slate-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {value ? (
        <div className="relative group">
          <div className="relative aspect-video w-full max-w-md rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
            {isVideo ? (
              <video
                src={value}
                className="w-full h-full object-contain"
                controls
                muted
              />
            ) : (
              <Image
                src={value}
                alt="Uploaded media"
                fill
                className="object-contain"
                sizes="(max-width: 448px) 100vw, 448px"
              />
            )}

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                {uploading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Replace"
                )}
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                disabled={uploading}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
            dragOver
              ? "border-blue-500 bg-blue-50"
              : "border-slate-300 hover:border-slate-400 hover:bg-slate-50",
            uploading && "pointer-events-none opacity-50"
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
              <p className="text-sm text-slate-600">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              {type === "video" ? (
                <Video className="w-10 h-10 text-slate-400" />
              ) : type === "media" ? (
                <div className="flex gap-2">
                  <ImageIcon className="w-8 h-8 text-slate-400" />
                  <Video className="w-8 h-8 text-slate-400" />
                </div>
              ) : (
                <ImageIcon className="w-10 h-10 text-slate-400" />
              )}
              <div>
                <p className="text-sm font-medium text-slate-700">
                  Drop {type === "video" ? "video" : type === "media" ? "file" : "image"} here or click to upload
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {acceptedFormats} (max {maxSizeMB}MB)
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes}
        onChange={handleFileSelect}
        className="hidden"
      />

      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
