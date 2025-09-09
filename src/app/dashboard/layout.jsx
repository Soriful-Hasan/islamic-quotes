"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, PlusCircle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { AuthContext } from "@/app/context/AuthContext";

export default function DashboardLayout({ children }) {
  const { user, logout } = useContext(AuthContext);
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r dark:bg-gray-900 dark:border-gray-800 p-4">
        <h2 className="text-lg font-bold mb-6">📖 Islamic Quotes</h2>
        <nav className="space-y-2">
          {/* Common for all logged-in users */}
          {user?.role === "user" && (
            <>
              <Link
                href="/dashboard"
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800",
                  pathname === "/dashboard"
                    ? "bg-gray-200 dark:bg-gray-700"
                    : "text-gray-600 dark:text-gray-300"
                )}
              >
                <Home className="h-4 w-4" />
                Dashboard Home
              </Link>

              <Link
                href="/dashboard/addQuotes"
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800",
                  pathname === "/dashboard/addQuotes"
                    ? "bg-gray-200 dark:bg-gray-700"
                    : "text-gray-600 dark:text-gray-300"
                )}
              >
                <PlusCircle className="h-4 w-4" />
                Add Quote
              </Link>
              <Link
                href="/dashboard/addedQuotes"
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800",
                  pathname === "/dashboard/addedQuotes"
                    ? "bg-gray-200 dark:bg-gray-700"
                    : "text-gray-600 dark:text-gray-300"
                )}
              >
                <PlusCircle className="h-4 w-4" />
                Added Quotes
              </Link>
            </>
          )}

          {/* Only admin */}
          {user?.role === "admin" && (
            <Link
              href="/dashboard/pendingQuotes"
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800",
                pathname === "/dashboard/pendingQuotes"
                  ? "bg-gray-200 dark:bg-gray-700"
                  : "text-gray-600 dark:text-gray-300"
              )}
            >
              <PlusCircle className="h-4 w-4" />
              Pending Quote
            </Link>
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-950">{children}</main>
    </div>
  );
}
