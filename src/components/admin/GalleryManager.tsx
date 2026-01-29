"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import {
  X,
  Loader2,
  AlertCircle,
  GripVertical,
  ImageIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_SIZE } from "@/lib/blob";

interface GalleryManagerProps {
  value: string[];
  onChange: (urls: string[]) => void;
  maxImages?: number;
  label?: string;
  className?: string;
}

export function GalleryManager({
  value = [],
  onChange,
  maxImages = 10,
  label,
  className,
}: GalleryManagerProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const canAddMore = value.length < maxImages;

  const handleUpload = useCallback(
    async (files: FileList) => {
      setError(null);

      const remainingSlots = maxImages - value.length;
      const filesToUpload = Array.from(files).slice(0, remainingSlots);

      if (filesToUpload.length === 0) {
        setError(`Maximum ${maxImages} images allowed`);
        return;
      }

      setUploading(true);
      const newUrls: string[] = [];

      try {
        for (const file of filesToUpload) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("type", "image");

          const response = await fetch("/api/admin/upload", {
            method: "POST",
            body: formData,
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || "Upload failed");
          }

          newUrls.push(data.url);
        }

        onChange([...value, ...newUrls]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setUploading(false);
      }
    },
    [value, onChange, maxImages]
  );

  const handleDelete = useCallback(
    async (index: number) => {
      const url = value[index];

      try {
        await fetch("/api/admin/upload", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        });
      } catch (err) {
        // Continue with removal even if delete fails
        console.error("Failed to delete from blob storage:", err);
      }

      const newUrls = value.filter((_, i) => i !== index);
      onChange(newUrls);
    },
    [value, onChange]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        handleUpload(files);
      }
      e.target.value = "";
    },
    [handleUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);

      // Handle file drop
      if (e.dataTransfer.files.length > 0) {
        handleUpload(e.dataTransfer.files);
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

  // Reorder drag handlers
  const handleImageDragStart = useCallback((index: number) => {
    setDraggedIndex(index);
  }, []);

  const handleImageDragOver = useCallback(
    (e: React.DragEvent, index: number) => {
      e.preventDefault();
      if (draggedIndex === null || draggedIndex === index) return;

      const newUrls = [...value];
      const draggedUrl = newUrls[draggedIndex];
      newUrls.splice(draggedIndex, 1);
      newUrls.splice(index, 0, draggedUrl);

      setDraggedIndex(index);
      onChange(newUrls);
    },
    [draggedIndex, value, onChange]
  );

  const handleImageDragEnd = useCallback(() => {
    setDraggedIndex(null);
  }, []);

  const maxSizeMB = MAX_IMAGE_SIZE / (1024 * 1024);

  return (
    <div className={cn("space-y-3", className)}>
      {label && (
        <label className="text-sm font-medium text-slate-700">
          {label}
          <span className="text-slate-400 font-normal ml-2">
            ({value.length}/{maxImages})
          </span>
        </label>
      )}

      {/* Image Grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {value.map((url, index) => (
            <div
              key={url}
              className={cn(
                "relative group aspect-square rounded-lg overflow-hidden bg-slate-100 border border-slate-200 cursor-move",
                draggedIndex === index && "opacity-50"
              )}
              draggable
              onDragStart={() => handleImageDragStart(index)}
              onDragOver={(e) => handleImageDragOver(e, index)}
              onDragEnd={handleImageDragEnd}
            >
              <Image
                src={url}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
              />

              {/* Drag Handle */}
              <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/90 rounded p-1">
                  <GripVertical className="w-4 h-4 text-slate-500" />
                </div>
              </div>

              {/* Delete Button */}
              <button
                type="button"
                onClick={() => handleDelete(index)}
                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Index Badge */}
              <div className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Area */}
      {canAddMore && (
        <div
          className={cn(
            "relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
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
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
              <p className="text-sm text-slate-600">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <ImageIcon className="w-8 h-8 text-slate-400" />
              <div>
                <p className="text-sm font-medium text-slate-700">
                  Drop images here or click to upload
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  JPEG, PNG, WebP, GIF (max {maxSizeMB}MB each)
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_IMAGE_TYPES.join(",")}
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {value.length > 1 && (
        <p className="text-xs text-slate-500">
          Drag images to reorder. First image will be featured.
        </p>
      )}
    </div>
  );
}
