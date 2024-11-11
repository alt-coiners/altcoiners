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
import { api } from "@/trpc/server";

export default async function Navbar() {
  const [newsCategories, videoCategories, guideCategories] = await Promise.all([
    api.news.getCategories(),
    api.video.getCategories(),
    api.guide.getCategories(),
  ]);

  return (
    <div className="fixed left-0 top-0 z-10 flex w-full items-center justify-between border border-primary/50 bg-white px-5 py-3 lg:px-20 xl:px-36 2xl:px-48">
      <Link href="/">
        <Image
          src="/images/altcoiners-logo.svg"
          alt="logo"
          width={160}
          height={120}
          quality={100}
          className="-my-4 lg:h-auto lg:w-52"
        />
      </Link>
      <NavigationMenu className="hidden border-0 lg:flex 2xl:gap-5">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>All</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid grid-cols-1 gap-2 rounded-lg p-4 shadow-md md:w-[400px] md:grid-cols-2 lg:w-[500px] lg:grid-cols-2 lg:gap-3 xl:w-[600px] xl:grid-cols-3 xl:gap-5 2xl:w-[700px] 2xl:grid-cols-5">
                <div key={newsCategories.title}>
                  <div className="font-bold">{newsCategories.title}</div>
                  {newsCategories.subMenus.map((subMenu, subIndex) => (
                    <Link href={subMenu.url} key={subIndex} passHref>
                      <NavigationMenuLink
                        key={subIndex}
                        className="mt-1 flex items-center gap-1"
                      >
                        {subMenu.title}
                      </NavigationMenuLink>
                    </Link>
                  ))}
                </div>
                <div key={videoCategories.title}>
                  <div className="font-bold">{videoCategories.title}</div>
                  {videoCategories.subMenus.map((subMenu, subIndex) => (
                    <Link href={subMenu.url} key={subIndex} passHref>
                      <NavigationMenuLink
                        key={subIndex}
                        className="mt-1 flex items-center gap-1"
                      >
                        {subMenu.title}
                      </NavigationMenuLink>
                    </Link>
                  ))}
                </div>
                <div key={guideCategories.title}>
                  <div className="font-bold">{guideCategories.title}</div>
                  {guideCategories.subMenus.map((subMenu, subIndex) => (
                    <Link href={subMenu.url} key={subIndex} passHref>
                      <NavigationMenuLink
                        key={subIndex}
                        className="mt-1 flex items-center gap-1"
                      >
                        {subMenu.title}
                      </NavigationMenuLink>
                    </Link>
                  ))}
                </div>
                {MENU_NAV_LINKS.map((menu, index) => (
                  <div key={index}>
                    <div className="font-bold">{menu.title}</div>
                    {menu.subMenus.map((subMenu, subIndex) => (
                      <Link href={subMenu.url} key={subIndex} passHref>
                        <NavigationMenuLink
                          key={subIndex}
                          className="mt-1 flex items-center gap-1"
                        >
                          {subMenu.title}
                        </NavigationMenuLink>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem key={newsCategories.title}>
            <NavigationMenuTrigger>
              {newsCategories.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid grid-cols-1 gap-2 rounded-lg p-4 shadow-md md:w-[400px] md:grid-cols-2 lg:w-[500px] lg:grid-cols-2 lg:gap-3">
                {newsCategories.subMenus.map((subMenu, index) => (
                  <Link href={subMenu.url} key={index} passHref>
                    <NavigationMenuLink
                      key={index}
                      className="flex items-center gap-1"
                    >
                      {subMenu.title}
                    </NavigationMenuLink>
                  </Link>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem key={videoCategories.title}>
            <NavigationMenuTrigger>
              {videoCategories.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid grid-cols-1 gap-2 rounded-lg p-4 shadow-md md:w-[400px] md:grid-cols-2 lg:w-[500px] lg:grid-cols-2 lg:gap-3">
                {videoCategories.subMenus.map((subMenu, index) => (
                  <Link href={subMenu.url} key={index} passHref>
                    <NavigationMenuLink
                      key={index}
                      className="flex items-center gap-1"
                    >
                      {subMenu.title}
                    </NavigationMenuLink>
                  </Link>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem key={guideCategories.title}>
            <NavigationMenuTrigger>
              {guideCategories.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid grid-cols-1 gap-2 rounded-lg p-4 shadow-md md:w-[400px] md:grid-cols-2 lg:w-[500px] lg:grid-cols-2 lg:gap-3">
                {guideCategories.subMenus.map((subMenu, index) => (
                  <Link href={subMenu.url} key={index} passHref>
                    <NavigationMenuLink
                      key={index}
                      className="flex items-center gap-1"
                    >
                      {subMenu.title}
                    </NavigationMenuLink>
                  </Link>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          {MENU_NAV_LINKS.map((menu, index) => (
            <NavigationMenuItem key={index}>
              <NavigationMenuTrigger>{menu.title}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid grid-cols-1 gap-2 rounded-lg p-4 shadow-md md:w-[400px] md:grid-cols-2 lg:w-[500px] lg:grid-cols-2 lg:gap-3">
                  {menu.subMenus.map((subMenu, index) => (
                    <Link href={subMenu.url} key={index} passHref>
                      <NavigationMenuLink
                        key={index}
                        className="flex items-center gap-1"
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
