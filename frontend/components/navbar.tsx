"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@heroui/react";
import { SignOutButton } from "@clerk/nextjs";
import { useUserStore } from "@/app/store";

export default function AppNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isAdmin } = useUserStore();

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Test",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  const navBarItems = [
    {
      label: "Home",
      href: "/home",
    },
    {
      label: "Search",
      href: "/search",
    },
    {
      label: "Create",
      href: "/create",
    },
    {
      label: "Profile",
      href: "/userprofile",
    },
  ];

  if (isAdmin) {
    navBarItems.push({
      label: "Admin",
      href: "/admin",
    });
  }
  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-playfair text-2xl font-bold">Storii</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {navBarItems.map((item, index) => (
          <NavbarItem
            key={`${item}-${index}`}
            isActive={pathname === item.href}
          >
            <Link
              className={`${pathname === item.href ? "font-bold text-gray-900" : "font-normal text-gray-700"}`}
              href={item.href}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <SignOutButton redirectUrl={"/"}>
            <Button className="font-bold text-gray-900 border border-gray-900 hover:bg-gray-950 hover:text-zinc-300">
              Sign Out
            </Button>
          </SignOutButton>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {navBarItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className={`${pathname === item.href ? "font-bold text-gray-900" : "font-normal text-gray-700"}`}
              href={item.href}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
