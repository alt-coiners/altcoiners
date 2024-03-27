import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { MENU_NAV_LINKS } from "@/utils/constant";
import { ChevronDown, Menu, Search, Triangle } from "lucide-react";
import Link from "next/link";
import HamburgerMenu from "./HamburgerMenu";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between border border-primary/50 px-5 py-3">
      <Link href="/dashboard">
        <div className="flex items-center gap-1 text-lg font-medium text-primary">
          <Triangle className="size-6" />
          <p>AltCoiners.live</p>
        </div>
      </Link>
      <Menubar className="hidden border-0 lg:flex 2xl:gap-5">
        {MENU_NAV_LINKS.map((menu, index) => (
          <MenubarMenu key={index}>
            <MenubarTrigger>
              {menu.title} <ChevronDown className="size-4" />
            </MenubarTrigger>
            <MenubarContent>
              {menu.subMenus.map((subMenu, index) => (
                <>
                  <Link href={subMenu.url} key={index}>
                    <MenubarItem key={index}>{subMenu.title}</MenubarItem>
                  </Link>
                  {index !== menu.subMenus.length - 1 && <MenubarSeparator />}
                </>
              ))}
            </MenubarContent>
          </MenubarMenu>
        ))}
      </Menubar>
      <div className="flex items-center gap-3">
        <HamburgerMenu />
        {/* <Search className="size-6 text-primary" /> */}
      </div>
    </div>
  );
}
