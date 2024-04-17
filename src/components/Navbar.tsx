"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { MENU_NAV_LINKS } from "@/utils/constant";
import Image from "next/image";
import Link from "next/link";
import HamburgerMenu from "./HamburgerMenu";
import SearchBar from "./searchBar";

export default function Navbar() {
  return (
    <div className="fixed left-0 top-0 z-10 flex w-full items-center justify-between border border-primary/50 bg-white px-5 py-3 lg:px-20 xl:px-36 2xl:px-48">
      <Link href="/dashboard">
        <Image
          src="/images/altcoiners-logo.svg"
          alt="logo"
          width={160}
          height={120}
          className="-my-4"
        />
      </Link>
      <NavigationMenu className="hidden border-0 lg:flex 2xl:gap-5">
        <NavigationMenuList>
          {MENU_NAV_LINKS.map((menu, index) => (
            <NavigationMenuItem key={index}>
              <NavigationMenuTrigger>{menu.title}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid grid-cols-1 gap-2 rounded-lg p-4 shadow-md md:w-[400px] md:grid-cols-2 lg:w-[500px] lg:grid-cols-2 lg:gap-3">
                  {menu.subMenus.map((subMenu, index) => (
                    <Link href={subMenu.url} key={index} passHref>
                      <NavigationMenuLink
                        key={index}
                        className="flex items-center gap-1 text-sm"
                      >
                        {subMenu.title}
                      </NavigationMenuLink>
                    </Link>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex items-center gap-3">
        <HamburgerMenu />
        <SearchBar />
      </div>
    </div>
  );
}
