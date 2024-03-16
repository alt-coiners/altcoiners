import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { ChevronDown, Menu, Search, Triangle } from "lucide-react";
import Link from "next/link";

const MenuNavLinks = [
  {
    title: "News",
    subMenus: [{ title: "New Window" }, { title: "Share" }, { title: "Print" }],
  },
  {
    title: "Exclusives",
    subMenus: [{ title: "New Window" }],
  },
  {
    title: "Videos",
    subMenus: [{ title: "New Window" }],
  },
  {
    title: "Guides",
    subMenus: [{ title: "New Window" }],
  },
  {
    title: "Exchanges",
    subMenus: [{ title: "New Window" }],
  },
];

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
        {MenuNavLinks.map((menu, index) => (
          <MenubarMenu key={index}>
            <MenubarTrigger>
              {menu.title} <ChevronDown className="size-4" />
            </MenubarTrigger>
            <MenubarContent>
              {menu.subMenus.map((subMenu, index) => (
                <>
                  <MenubarItem key={index}>{subMenu.title}</MenubarItem>
                  {index !== menu.subMenus.length - 1 && <MenubarSeparator />}
                </>
              ))}
            </MenubarContent>
          </MenubarMenu>
        ))}
      </Menubar>
      <Menu className="size-6 text-primary lg:hidden" />
      <Search className="size-6 text-primary" />
    </div>
  );
}
