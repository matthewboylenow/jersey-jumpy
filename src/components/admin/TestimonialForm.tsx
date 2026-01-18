"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Loader2, Save, ArrowLeft, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Testimonial } from "@/lib/db/schema";

interface FormData {
  customerName: string;
  location?: string;
  content: string;
  rating: number;
  featured: boolean;
  isActive: boolean;
}

interface TestimonialFormProps {
  testimonial: Testimonial | null;
}

export function TestimonialForm({ testimonial }: TestimonialFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      customerName: testimonial?.customerName || "",
      location: testimonial?.location || "",
      content: testimonial?.content || "",
      rating: testimonial?.rating || 5,
      featured: testimonial?.featured ?? false,
      isActive: testimonial?.isActive ?? true,
    },
  });

  const currentRating = watch("rating");

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const url = testimonial
        ? `/api/admin/testimonials/${testimonial.id}`
        : "/api/admin/testimonials";
      const method = testimonial ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/admin/testimonials");
        router.refresh();
      }
    } catch (error) {
      console.error("Error saving testimonial:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Testimonial Content */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <h2 className="text-lg font-semibold text-slate-900">Testimonial Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="customerName">Customer Name *</Label>
            <Input
              id="customerName"
              {...register("customerName", { required: true })}
              placeholder="e.g., John D."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              {...register("location")}
              placeholder="e.g., Toms River, NJ"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Review Content *</Label>
          <Textarea
            id="content"
            {...register("content", { required: true })}
            rows={5}
            placeholder="Enter the customer's review..."
          />
        </div>

        <div className="space-y-2">
          <Label>Rating</Label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setValue("rating", star)}
                className="p-1 hover:scale-110 transition-transform"
              >
                <Star
                  className={`w-6 h-6 ${
                    star <= currentRating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-slate-300"
                  }`}
                />
              </button>
            ))}
            <span className="ml-2 text-sm text-slate-600">
              {currentRating} out of 5
            </span>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <h2 className="text-lg font-semibold text-slate-900">Settings</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="featured">Featured</Label>
              <p className="text-sm text-slate-500">Display prominently on homepage</p>
            </div>
            <Switch
              id="featured"
              checked={watch("featured")}
              onCheckedChange={(checked) => setValue("featured", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="isActive">Active</Label>
              <p className="text-sm text-slate-500">Show on public website</p>
            </div>
            <Switch
              id="isActive"
              checked={watch("isActive")}
              onCheckedChange={(checked) => setValue("isActive", checked)}
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <Button type="button" variant="outline" asChild>
          <Link href="/admin/testimonials">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Cancel
          </Link>
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              {testimonial ? "Save Changes" : "Create Testimonial"}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
