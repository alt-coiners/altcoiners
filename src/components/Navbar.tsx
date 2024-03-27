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
    subMenus: [
      { title: "Bitcoin News", url: "/dashboard/news/Bitcoin" },
      { title: "Ethereum News", url: "/dashboard/news/Ethereum" },
      { title: "NFT News", url: "/dashboard/news/NFT" },
      { title: "DeFi News", url: "/dashboard/news/DeFi" },
      { title: "Altcoin News", url: "/dashboard/news/Altcoin" },
      { title: "Blockchain News", url: "/dashboard/news/Blockchain" },
      { title: "Finance News", url: "/dashboard/news/Finance" },
      { title: "Technology News", url: "/dashboard/news/Technology" },
    ],
  },
  {
    title: "Exclusives",
    subMenus: [{ title: "Opinions", url: "/dashboard/exclusives/Opinions" }],
  },
  {
    title: "Videos",
    subMenus: [
      { title: "Bitcoin Videos", url: "/dashboard/videos/Bitcoin" },
      { title: "Ethereum Videos", url: "/dashboard/videos/Ethereum" },
      { title: "NFT Videos", url: "/dashboard/videos/NFT" },
      { title: "DeFi Videos", url: "/dashboard/videos/DeFi" },
      { title: "Altcoin Videos", url: "/dashboard/videos/Altcoin" },
      { title: "Blockchain Videos", url: "/dashboard/videos/Blockchain" },
    ],
  },
  {
    title: "Guides",
    subMenus: [
      { title: "Bitcoin", url: "/dashboard/guides/1" },
      { title: "Others", url: "/dashboard/guides/2" },
    ],
  },
  {
    title: "Exchanges",
    subMenus: [{ title: "Exchanges", url: "/dashboard/reviews" }],
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
        <Menu className="size-6 text-primary lg:hidden" />
        <Search className="size-6 text-primary" />
      </div>
    </div>
  );
}
