"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface SettingsFormProps {
  settings: Record<string, string>;
}

export function SettingsForm({ settings }: SettingsFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    business_name: settings.business_name || "Jersey Jumpy",
    business_phone: settings.business_phone || "",
    business_email: settings.business_email || "",
    business_address: settings.business_address || "",
    service_area: settings.service_area || "",
    hours_of_operation: settings.hours_of_operation || "",
    facebook_url: settings.facebook_url || "",
    instagram_url: settings.instagram_url || "",
    google_reviews_url: settings.google_reviews_url || "",
    rental_deposit: settings.rental_deposit || "100",
    delivery_fee_note: settings.delivery_fee_note || "",
    meta_title: settings.meta_title || "",
    meta_description: settings.meta_description || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Error saving settings:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Business Info */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Business Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="business_name">Business Name</Label>
            <Input
              id="business_name"
              name="business_name"
              value={formData.business_name}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="business_phone">Phone Number</Label>
            <Input
              id="business_phone"
              name="business_phone"
              value={formData.business_phone}
              onChange={handleChange}
              placeholder="(732) 555-1234"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="business_email">Email Address</Label>
            <Input
              id="business_email"
              name="business_email"
              type="email"
              value={formData.business_email}
              onChange={handleChange}
              placeholder="info@jerseyjumpy.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hours_of_operation">Hours of Operation</Label>
            <Input
              id="hours_of_operation"
              name="hours_of_operation"
              value={formData.hours_of_operation}
              onChange={handleChange}
              placeholder="Mon-Sun: 8am-8pm"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="business_address">Business Address</Label>
          <Textarea
            id="business_address"
            name="business_address"
            value={formData.business_address}
            onChange={handleChange}
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="service_area">Service Area</Label>
          <Textarea
            id="service_area"
            name="service_area"
            value={formData.service_area}
            onChange={handleChange}
            rows={2}
            placeholder="We serve Monmouth County, Ocean County, and surrounding areas..."
          />
        </div>
      </div>

      {/* Social Media */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <h2 className="text-lg font-semibold text-slate-900">Social Media</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="facebook_url">Facebook URL</Label>
            <Input
              id="facebook_url"
              name="facebook_url"
              value={formData.facebook_url}
              onChange={handleChange}
              placeholder="https://facebook.com/jerseyjumpy"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instagram_url">Instagram URL</Label>
            <Input
              id="instagram_url"
              name="instagram_url"
              value={formData.instagram_url}
              onChange={handleChange}
              placeholder="https://instagram.com/jerseyjumpy"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="google_reviews_url">Google Reviews URL</Label>
          <Input
            id="google_reviews_url"
            name="google_reviews_url"
            value={formData.google_reviews_url}
            onChange={handleChange}
            placeholder="https://g.page/r/..."
          />
        </div>
      </div>

      {/* Pricing Settings */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <h2 className="text-lg font-semibold text-slate-900">Pricing & Fees</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="rental_deposit">Rental Deposit ($)</Label>
            <Input
              id="rental_deposit"
              name="rental_deposit"
              type="number"
              value={formData.rental_deposit}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="delivery_fee_note">Delivery Fee Note</Label>
          <Textarea
            id="delivery_fee_note"
            name="delivery_fee_note"
            value={formData.delivery_fee_note}
            onChange={handleChange}
            rows={3}
            placeholder="Free delivery within 15 miles. $2/mile for additional distance."
          />
        </div>
      </div>

      {/* SEO Settings */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <h2 className="text-lg font-semibold text-slate-900">
          SEO Settings
        </h2>

        <div className="space-y-2">
          <Label htmlFor="meta_title">Default Meta Title</Label>
          <Input
            id="meta_title"
            name="meta_title"
            value={formData.meta_title}
            onChange={handleChange}
            placeholder="Jersey Jumpy - Bounce House Rentals in NJ"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="meta_description">Default Meta Description</Label>
          <Textarea
            id="meta_description"
            name="meta_description"
            value={formData.meta_description}
            onChange={handleChange}
            rows={3}
            placeholder="Premium bounce house and inflatable rentals serving Monmouth and Ocean County, NJ. Safe, clean, and fun for all ages!"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
