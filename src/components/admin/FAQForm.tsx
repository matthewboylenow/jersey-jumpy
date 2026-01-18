"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Loader2, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { FAQ } from "@/lib/db/schema";

interface FormData {
  question: string;
  answer: string;
  sortOrder: number;
  isActive: boolean;
}

interface FAQFormProps {
  faq: FAQ | null;
}

export function FAQForm({ faq }: FAQFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      question: faq?.question || "",
      answer: faq?.answer || "",
      sortOrder: faq?.sortOrder || 0,
      isActive: faq?.isActive ?? true,
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const url = faq
        ? `/api/admin/faqs/${faq.id}`
        : "/api/admin/faqs";
      const method = faq ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/admin/faqs");
        router.refresh();
      }
    } catch (error) {
      console.error("Error saving FAQ:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* FAQ Content */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <h2 className="text-lg font-semibold text-slate-900">FAQ Details</h2>

        <div className="space-y-2">
          <Label htmlFor="question">Question *</Label>
          <Input
            id="question"
            {...register("question", { required: true })}
            placeholder="e.g., How much space is required for setup?"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="answer">Answer *</Label>
          <Textarea
            id="answer"
            {...register("answer", { required: true })}
            rows={6}
            placeholder="Enter the answer to this question..."
          />
          <p className="text-sm text-slate-500">
            You can use basic formatting. Line breaks will be preserved.
          </p>
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <h2 className="text-lg font-semibold text-slate-900">Settings</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="sortOrder">Sort Order</Label>
            <Input
              id="sortOrder"
              type="number"
              {...register("sortOrder", { valueAsNumber: true })}
              placeholder="0"
            />
            <p className="text-sm text-slate-500">Lower numbers appear first</p>
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
          <Link href="/admin/faqs">
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
              {faq ? "Save Changes" : "Create FAQ"}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
