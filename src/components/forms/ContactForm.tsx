"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(5, "Please enter your address"),
  city: z.string().min(2, "Please enter your city"),
  state: z.string().min(2, "Please enter your state"),
  zip: z.string().min(5, "Please enter your ZIP code"),
  requestedDate: z.string().min(1, "Please select a date"),
  requestedTime: z.string().min(1, "Please enter a time"),
  requestedJumpy: z.string().min(1, "Please select an inflatable or package"),
  referralSource: z.string().optional(),
  eventDetails: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ProductOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface ContactFormProps {
  productOptions: ProductOption[];
}

const referralOptions = [
  { value: "", label: "How did you hear about us?" },
  { value: "google", label: "Google Search" },
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "twitter", label: "Twitter" },
  { value: "truck", label: "Saw our truck on the road" },
  { value: "postcard", label: "Postcard" },
  { value: "word-of-mouth", label: "Word of mouth" },
  { value: "recommendation", label: "Friend/Family recommendation" },
  { value: "other", label: "Other" },
];

export function ContactForm({ productOptions }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setStatus("success");
      reset();
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again or call us directly.");
    }
  };

  // Success State
  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          className="w-20 h-20 rounded-full bg-mint/20 flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-10 h-10 text-mint-dark" />
        </motion.div>
        <h3 className="font-display font-bold text-2xl text-text-primary mb-2">
          Request Received!
        </h3>
        <p className="text-text-secondary mb-6">
          Thanks for reaching out! We&apos;ll get back to you within 24 hours.
        </p>
        <Button
          onClick={() => setStatus("idle")}
          variant="outline"
          className="rounded-full"
        >
          Submit Another Request
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Error Banner */}
      <AnimatePresence>
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 p-4 rounded-xl bg-coral/10 text-coral-dark"
            role="alert"
            aria-live="polite"
          >
            <AlertCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
            <p className="text-sm">{errorMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Info Section */}
      <div>
        <h3 className="font-display font-bold text-lg text-text-primary mb-4">
          Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              placeholder="John Smith"
              className={cn(errors.name && "border-coral")}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-coral">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(732) 555-1234"
              className={cn(errors.phone && "border-coral")}
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-xs text-coral">{errors.phone.message}</p>
            )}
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              className={cn(errors.email && "border-coral")}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-coral">{errors.email.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Address Section */}
      <div>
        <h3 className="font-display font-bold text-lg text-text-primary mb-4">
          Event Location
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address">Street Address *</Label>
            <Input
              id="address"
              placeholder="123 Main Street"
              className={cn(errors.address && "border-coral")}
              {...register("address")}
            />
            {errors.address && (
              <p className="text-xs text-coral">{errors.address.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              placeholder="Edison"
              className={cn(errors.city && "border-coral")}
              {...register("city")}
            />
            {errors.city && (
              <p className="text-xs text-coral">{errors.city.message}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="state">State *</Label>
              <Input
                id="state"
                placeholder="NJ"
                className={cn(errors.state && "border-coral")}
                {...register("state")}
              />
              {errors.state && (
                <p className="text-xs text-coral">{errors.state.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip">ZIP Code *</Label>
              <Input
                id="zip"
                placeholder="08817"
                className={cn(errors.zip && "border-coral")}
                {...register("zip")}
              />
              {errors.zip && (
                <p className="text-xs text-coral">{errors.zip.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Event Details Section */}
      <div>
        <h3 className="font-display font-bold text-lg text-text-primary mb-4">
          Event Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="requestedDate">Event Date *</Label>
            <Input
              id="requestedDate"
              type="date"
              className={cn(errors.requestedDate && "border-coral")}
              {...register("requestedDate")}
            />
            {errors.requestedDate && (
              <p className="text-xs text-coral">{errors.requestedDate.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="requestedTime">Preferred Time *</Label>
            <Input
              id="requestedTime"
              type="time"
              className={cn(errors.requestedTime && "border-coral")}
              {...register("requestedTime")}
            />
            {errors.requestedTime && (
              <p className="text-xs text-coral">{errors.requestedTime.message}</p>
            )}
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="requestedJumpy">Inflatable / Package *</Label>
            <select
              id="requestedJumpy"
              className={cn(
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                errors.requestedJumpy && "border-coral"
              )}
              {...register("requestedJumpy")}
            >
              {productOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </option>
              ))}
            </select>
            {errors.requestedJumpy && (
              <p className="text-xs text-coral">{errors.requestedJumpy.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div>
        <h3 className="font-display font-bold text-lg text-text-primary mb-4">
          Additional Information
        </h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="referralSource">How did you hear about us?</Label>
            <select
              id="referralSource"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              {...register("referralSource")}
            >
              {referralOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="eventDetails">Event Details / Special Requests</Label>
            <Textarea
              id="eventDetails"
              placeholder="Tell us about your event, any special requests, or questions you have..."
              rows={4}
              {...register("eventDetails")}
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={status === "loading"}
        aria-busy={status === "loading"}
        className="w-full py-6 rounded-full font-display font-bold text-lg bg-gradient-to-r from-cta-primary to-cta-primary-hover hover:opacity-90"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" aria-hidden="true" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" aria-hidden="true" />
            Send Request
          </>
        )}
      </Button>

      <p className="text-xs text-text-muted text-center">
        By submitting this form, you agree to be contacted about your inquiry.
        We typically respond within 24 hours.
      </p>
    </form>
  );
}
