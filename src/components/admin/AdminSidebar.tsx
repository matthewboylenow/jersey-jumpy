"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Castle,
  Package,
  MessageSquare,
  HelpCircle,
  Mail,
  Settings,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Inflatables",
    href: "/admin/inflatables",
    icon: Castle,
  },
  {
    label: "Party Packages",
    href: "/admin/packages",
    icon: Package,
  },
  {
    label: "Testimonials",
    href: "/admin/testimonials",
    icon: MessageSquare,
  },
  {
    label: "FAQs",
    href: "/admin/faqs",
    icon: HelpCircle,
  },
  {
    label: "Inquiries",
    href: "/admin/inquiries",
    icon: Mail,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white hidden lg:block">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <Link href="/admin" className="flex items-center gap-3">
          <Image
            src="/logo.svg"
            alt="Jersey Jumpy"
            width={140}
            height={40}
            className="h-8 w-auto"
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-cta-primary text-white"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <ExternalLink className="w-5 h-5" />
          View Website
        </a>
      </div>
    </aside>
  );
}
