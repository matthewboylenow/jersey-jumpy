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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Inflatable } from "@/lib/db/schema";

interface FormData {
  name: string;
  slug: string;
  subtitle?: string;
  category: string;
  description?: string;
  width?: string;
  length?: string;
  height?: string;
  spaceRequired?: string;
  capacityAges2to4?: string;
  capacityAges4to7?: string;
  capacityAges7to10?: string;
  capacityAges10Plus?: string;
  heightRequirement?: string;
  adultsAllowed: boolean;
  adultWeightLimit?: string;
  adultMaxCount?: number;
  canUseWater: boolean;
  hasPool: boolean;
  hasSlide: boolean;
  hasBasketballHoop: boolean;
  hasClimbingWall: boolean;
  comboFeatures?: string;
  setupSurface?: string;
  powerRequirement?: string;
  generatorNote?: string;
  price?: number;
  priceNote?: string;
  mainImageUrl?: string;
  isActive: boolean;
  sortOrder: number;
}

interface InflatableFormProps {
  inflatable: Inflatable | null;
}

const categories = [
  { value: "13x13-bouncers", label: "13'x13' Bouncers" },
  { value: "castle-bouncers", label: "Castle Bouncers" },
  { value: "combo-bouncers", label: "Combo Bouncers" },
  { value: "wet-dry-slides", label: "Wet/Dry Slides" },
  { value: "obstacle-courses", label: "Obstacle Courses" },
];

export function InflatableForm({ inflatable }: InflatableFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: inflatable?.name || "",
      slug: inflatable?.slug || "",
      subtitle: inflatable?.subtitle || "",
      category: inflatable?.category || "",
      description: inflatable?.description || "",
      width: inflatable?.width || "",
      length: inflatable?.length || "",
      height: inflatable?.height || "",
      spaceRequired: inflatable?.spaceRequired || "",
      capacityAges2to4: inflatable?.capacityAges2to4 || "",
      capacityAges4to7: inflatable?.capacityAges4to7 || "",
      capacityAges7to10: inflatable?.capacityAges7to10 || "",
      capacityAges10Plus: inflatable?.capacityAges10Plus || "",
      heightRequirement: inflatable?.heightRequirement || "",
      adultsAllowed: inflatable?.adultsAllowed ?? true,
      adultWeightLimit: inflatable?.adultWeightLimit || "",
      adultMaxCount: inflatable?.adultMaxCount || undefined,
      canUseWater: inflatable?.canUseWater ?? false,
      hasPool: inflatable?.hasPool ?? false,
      hasSlide: inflatable?.hasSlide ?? false,
      hasBasketballHoop: inflatable?.hasBasketballHoop ?? false,
      hasClimbingWall: inflatable?.hasClimbingWall ?? false,
      comboFeatures: inflatable?.comboFeatures || "",
      setupSurface: inflatable?.setupSurface || "",
      powerRequirement: inflatable?.powerRequirement || "within 100' of power source",
      generatorNote: inflatable?.generatorNote || "Gas generator available for $100 additional",
      price: inflatable?.price || undefined,
      priceNote: inflatable?.priceNote || "",
      mainImageUrl: inflatable?.mainImageUrl || "",
      isActive: inflatable?.isActive ?? true,
      sortOrder: inflatable?.sortOrder || 0,
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const url = inflatable
        ? `/api/admin/inflatables/${inflatable.id}`
        : "/api/admin/inflatables";
      const method = inflatable ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/admin/inflatables");
        router.refresh();
      }
    } catch (error) {
      console.error("Error saving inflatable:", error);
    } finally {
      setLoading(false);
    }
  };

  // Auto-generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Basic Info */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <h2 className="text-lg font-semibold text-slate-900">Basic Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              {...register("name")}
              onChange={(e) => {
                register("name").onChange(e);
                if (!inflatable) {
                  setValue("slug", generateSlug(e.target.value));
                }
              }}
              placeholder="e.g., Batman Bouncer"
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">URL Slug *</Label>
            <Input
              id="slug"
              {...register("slug")}
              placeholder="e.g., batman-bouncer"
            />
            {errors.slug && (
              <p className="text-sm text-red-600">{errors.slug.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtitle</Label>
            <Input
              id="subtitle"
              {...register("subtitle")}
              placeholder="e.g., 13'x13' Bouncer"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select
              value={watch("category")}
              onValueChange={(value) => setValue("category", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-sm text-red-600">{errors.category.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            {...register("description")}
            rows={4}
            placeholder="Describe this inflatable..."
          />
        </div>
      </div>

      {/* Dimensions */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <h2 className="text-lg font-semibold text-slate-900">Dimensions</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <Label htmlFor="width">Width</Label>
            <Input id="width" {...register("width")} placeholder="13'" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="length">Length</Label>
            <Input id="length" {...register("length")} placeholder="13'" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">Height</Label>
            <Input id="height" {...register("height")} placeholder="15'" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="spaceRequired">Space Required</Label>
            <Input id="spaceRequired" {...register("spaceRequired")} placeholder="18' x 18'" />
          </div>
        </div>
      </div>

      {/* Capacity */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <h2 className="text-lg font-semibold text-slate-900">Capacity</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <Label htmlFor="capacityAges2to4">Ages 2-4</Label>
            <Input id="capacityAges2to4" {...register("capacityAges2to4")} placeholder="6-8 kids" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="capacityAges4to7">Ages 4-7</Label>
            <Input id="capacityAges4to7" {...register("capacityAges4to7")} placeholder="5-6 kids" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="capacityAges7to10">Ages 7-10</Label>
            <Input id="capacityAges7to10" {...register("capacityAges7to10")} placeholder="4-5 kids" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="capacityAges10Plus">Ages 10+</Label>
            <Input id="capacityAges10Plus" {...register("capacityAges10Plus")} placeholder="3-4 kids" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="heightRequirement">Height Requirement</Label>
            <Input id="heightRequirement" {...register("heightRequirement")} placeholder="42&quot; minimum" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="adultWeightLimit">Adult Weight Limit</Label>
            <Input id="adultWeightLimit" {...register("adultWeightLimit")} placeholder="180 lbs/person" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="adultMaxCount">Max Adults</Label>
            <Input id="adultMaxCount" type="number" {...register("adultMaxCount")} placeholder="2" />
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <h2 className="text-lg font-semibold text-slate-900">Features</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="adultsAllowed">Adults Allowed</Label>
            <Switch
              id="adultsAllowed"
              checked={watch("adultsAllowed")}
              onCheckedChange={(checked) => setValue("adultsAllowed", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="canUseWater">Can Use Water</Label>
            <Switch
              id="canUseWater"
              checked={watch("canUseWater")}
              onCheckedChange={(checked) => setValue("canUseWater", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="hasPool">Has Pool</Label>
            <Switch
              id="hasPool"
              checked={watch("hasPool")}
              onCheckedChange={(checked) => setValue("hasPool", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="hasSlide">Has Slide</Label>
            <Switch
              id="hasSlide"
              checked={watch("hasSlide")}
              onCheckedChange={(checked) => setValue("hasSlide", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="hasBasketballHoop">Has Basketball Hoop</Label>
            <Switch
              id="hasBasketballHoop"
              checked={watch("hasBasketballHoop")}
              onCheckedChange={(checked) => setValue("hasBasketballHoop", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="hasClimbingWall">Has Climbing Wall</Label>
            <Switch
              id="hasClimbingWall"
              checked={watch("hasClimbingWall")}
              onCheckedChange={(checked) => setValue("hasClimbingWall", checked)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="comboFeatures">Combo Features</Label>
          <Input
            id="comboFeatures"
            {...register("comboFeatures")}
            placeholder="e.g., jumping area, basketball hoop, climbing ladder, slide"
          />
        </div>
      </div>

      {/* Pricing */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <h2 className="text-lg font-semibold text-slate-900">Pricing</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="price">Price ($)</Label>
            <Input id="price" type="number" {...register("price")} placeholder="350" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="priceNote">Price Note</Label>
            <Input
              id="priceNote"
              {...register("priceNote")}
              placeholder="Estimated price based on location"
            />
          </div>
        </div>
      </div>

      {/* Image */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <h2 className="text-lg font-semibold text-slate-900">Image</h2>

        <div className="space-y-2">
          <Label htmlFor="mainImageUrl">Main Image URL</Label>
          <Input
            id="mainImageUrl"
            {...register("mainImageUrl")}
            placeholder="https://..."
          />
          <p className="text-sm text-slate-500">
            Enter the URL of the main image for this inflatable
          </p>
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
            <Input id="sortOrder" type="number" {...register("sortOrder")} placeholder="0" />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <Button type="button" variant="outline" asChild>
          <Link href="/admin/inflatables">
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
              {inflatable ? "Save Changes" : "Create Inflatable"}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
