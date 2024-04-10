import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { MENU_NAV_LINKS } from "@/utils/constant";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import HamburgerMenu from "./HamburgerMenu";
import SearchBar from "./searchBar";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between border border-primary/50 px-5 py-3 lg:px-20 xl:px-36 2xl:px-48">
      <Link href="/dashboard">
        <Image
          src="/images/altcoiners-logo.png"
          width={125}
          height={75}
          quality={100}
          alt="logo"
        />
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
        <SearchBar />
      </div>
    </div>
  );
}
