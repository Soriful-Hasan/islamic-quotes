"use client";
import React, { useContext } from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Menu } from "lucide-react";
import useLogout from "@/hooks/useLogout";
import { AuthContext } from "@/app/context/AuthContext";
export default function NavBar() {
  const { user, setUser } = useContext(AuthContext);
  const logout = useLogout(setUser);
  console.log(user);
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/quotes" },
    { label: "About", href: "/about" },
  ];
  return (
    <header className="w-full border-b bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href={"/"} className="text-xl font-bold">
          Islamic <span className="text-primary">Quotes</span>
        </Link>
        <div className="inline ">
          <img
            width={30}
            height={30}
            className="border rounded-full"
            src={user.photo}
            alt=""
          />
        </div>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-4 md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <Link
                    href={item.href}
                    className="px-3 py-2 text-sm font-medium hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          {user ? (
            <>
              <Button onClick={logout}>Logout</Button>
              <p>{user.name}</p>
              <p>{user.role}</p>
            </>
          ) : (
            <Button asChild>
              <Link href={"/auth/register"}>Register</Link>
            </Button>
          )}
        </div>
        {/* mobile menu placeholder */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button aria-label="Menu">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-lg font-bold">
                  Islamic<span className="text-primary">Quotes</span>
                </SheetTitle>
              </SheetHeader>
              <div className="mt-10 flex flex-col items-center gap-6">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className="text-lg font-medium hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Button asChild className="w-32">
                    <Link href="/register">Register</Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
