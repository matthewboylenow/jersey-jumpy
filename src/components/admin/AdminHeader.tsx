"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Menu,
  LogOut,
  User,
  ChevronDown,
  LayoutDashboard,
  Castle,
  Package,
  MessageSquare,
  HelpCircle,
  Mail,
  Settings,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface AdminHeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
  };
}

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Inflatables", href: "/admin/inflatables", icon: Castle },
  { label: "Packages", href: "/admin/packages", icon: Package },
  { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
  { label: "FAQs", href: "/admin/faqs", icon: HelpCircle },
  { label: "Inquiries", href: "/admin/inquiries", icon: Mail },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminHeader({ user }: AdminHeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
      {/* Mobile Menu Button */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 bg-slate-900">
          <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
            <Image
              src="/logo.svg"
              alt="Jersey Jumpy"
              width={120}
              height={34}
              className="h-7 w-auto"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/admin" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
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
        </SheetContent>
      </Sheet>

      {/* Page Title - Desktop only */}
      <div className="hidden lg:block">
        <h1 className="text-lg font-semibold text-slate-900">
          {navItems.find(
            (item) =>
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href))
          )?.label || "Admin"}
        </h1>
      </div>

      {/* Mobile Logo */}
      <div className="lg:hidden">
        <Image
          src="/logo.svg"
          alt="Jersey Jumpy"
          width={100}
          height={28}
          className="h-6 w-auto"
        />
      </div>

      {/* User Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-cta-primary/10 flex items-center justify-center">
              <User className="w-4 h-4 text-cta-primary" />
            </div>
            <span className="hidden sm:block text-sm font-medium">
              {user.name || user.email}
            </span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="px-2 py-1.5">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-slate-500">{user.email}</p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/admin/settings">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="text-red-600"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
