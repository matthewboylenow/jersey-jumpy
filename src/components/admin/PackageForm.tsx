"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { Loader2, Save, ArrowLeft, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PartyPackage } from "@/lib/db/schema";

interface PackageItem {
  quantity: number;
  name: string;
}

interface FormData {
  name: string;
  price: number;
  items: PackageItem[];
  imageUrl?: string;
  isActive: boolean;
  sortOrder: number;
}

interface PackageFormProps {
  pkg: PartyPackage | null;
}

export function PackageForm({ pkg }: PackageFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      name: pkg?.name || "",
      price: pkg?.price || 0,
      items: (pkg?.items as PackageItem[]) || [{ quantity: 1, name: "" }],
      imageUrl: pkg?.imageUrl || "",
      isActive: pkg?.isActive ?? true,
      sortOrder: pkg?.sortOrder || 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const url = pkg
        ? `/api/admin/packages/${pkg.id}`
        : "/api/admin/packages";
      const method = pkg ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/admin/packages");
        router.refresh();
      }
    } catch (error) {
      console.error("Error saving package:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Basic Info */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <h2 className="text-lg font-semibold text-slate-900">Package Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Package Name *</Label>
            <Input
              id="name"
              {...register("name", { required: true })}
              placeholder="e.g., Bronze Package"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price ($) *</Label>
            <Input
              id="price"
              type="number"
              {...register("price", { required: true, valueAsNumber: true })}
              placeholder="350"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            id="imageUrl"
            {...register("imageUrl")}
            placeholder="https://..."
          />
        </div>
      </div>

      {/* Package Items */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Package Items</h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ quantity: 1, name: "" })}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </div>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-4">
              <div className="w-24">
                <Input
                  type="number"
                  {...register(`items.${index}.quantity` as const, {
                    valueAsNumber: true,
                  })}
                  placeholder="Qty"
                />
              </div>
              <div className="flex-1">
                <Input
                  {...register(`items.${index}.name` as const)}
                  placeholder="Item name (e.g., 13x13 Bouncer)"
                />
              </div>
              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <h2 className="text-lg font-semibold text-slate-900">Settings</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <div className="space-y-2">
            <Label htmlFor="sortOrder">Sort Order</Label>
            <Input
              id="sortOrder"
              type="number"
              {...register("sortOrder", { valueAsNumber: true })}
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <Button type="button" variant="outline" asChild>
          <Link href="/admin/packages">
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
              {pkg ? "Save Changes" : "Create Package"}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
