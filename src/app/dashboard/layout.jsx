"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, PlusCircle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const sidebarItems = [
  { name: "Dashboard Home", href: "/dashboard", icon: Home },
  { name: "Add Quote", href: "/dashboard/addQuotes", icon: PlusCircle },
  { name: "Pending Quote", href: "/dashboard/pendingQuotes", icon: PlusCircle },
];

export default function layout({ children }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r dark:bg-gray-900 dark:border-gray-800 p-4">
        <h2 className="text-lg font-bold mb-6">📖 Islamic Quotes</h2>
        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800",
                  pathname === item.href
                    ? "bg-gray-200 dark:bg-gray-700"
                    : "text-gray-600 dark:text-gray-300"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
          <Button variant="destructive" className="w-full flex gap-2 mt-4">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-950">{children}</main>
    </div>
  );
}
