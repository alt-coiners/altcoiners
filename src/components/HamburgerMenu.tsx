import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { api } from "@/trpc/server";
import { MENU_NAV_LINKS } from "@/utils/constant";
import { Menu } from "lucide-react";
import Link from "next/link";

export default async function HamburgerMenu() {
  const [newsCategories, videoCategories, guideCategories] = await Promise.all([
    api.news.getCategories.query(),
    api.video.getCategories.query(),
    api.guide.getCategories.query(),
  ]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Menu className="size-6 text-primary lg:hidden" />
      </PopoverTrigger>
      <PopoverContent className="w-screen">
        <Accordion type="single" collapsible className="w-full">
          {/* create a all accordian which contain all the other titles and their submenus */}
          <AccordionItem value="menu-all" className="outline-none">
            <AccordionTrigger className="outline-none">All</AccordionTrigger>
            <AccordionContent>
              <ul className="flex flex-col gap-3 pl-4">
                <ul key={newsCategories.title}>
                  <Link href={newsCategories.href ?? ""}>
                    {newsCategories.title}
                  </Link>
                </ul>
                <ul key={videoCategories.title}>
                  <Link href={videoCategories.href ?? ""}>
                    {videoCategories.title}
                  </Link>
                </ul>
                <ul key={guideCategories.title}>
                  <Link href={guideCategories.href ?? ""}>
                    {guideCategories.title}
                  </Link>
                </ul>
                {MENU_NAV_LINKS.map((menu, index) => (
                  <ul key={index}>
                    <Link href={menu.href ?? ""}>{menu.title}</Link>
                  </ul>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            key={newsCategories.title}
            value={newsCategories.title}
            className="outline-none"
          >
            <AccordionTrigger className="outline-none">
              {newsCategories.title}
            </AccordionTrigger>
            <AccordionContent>
              <ul className="flex flex-col gap-3 pl-4">
                {newsCategories.subMenus.map((subMenu, subIndex) => (
                  <Link key={subIndex} href={subMenu.url}>
                    {subMenu.title}
                  </Link>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            key={videoCategories.title}
            value={videoCategories.title}
            className="outline-none"
          >
            <AccordionTrigger className="outline-none">
              {videoCategories.title}
            </AccordionTrigger>
            <AccordionContent>
              <ul className="flex flex-col gap-3 pl-4">
                {videoCategories.subMenus.map((subMenu, subIndex) => (
                  <Link key={subIndex} href={subMenu.url}>
                    {subMenu.title}
                  </Link>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            key={guideCategories.title}
            value={guideCategories.title}
            className="outline-none"
          >
            <AccordionTrigger className="outline-none">
              {guideCategories.title}
            </AccordionTrigger>
            <AccordionContent>
              <ul className="flex flex-col gap-3 pl-4">
                {guideCategories.subMenus.map((subMenu, subIndex) => (
                  <Link key={subIndex} href={subMenu.url}>
                    {subMenu.title}
                  </Link>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          {MENU_NAV_LINKS.map((menu, index) => (
            <AccordionItem
              key={index}
              value={`menu-${index}`}
              className="outline-none"
            >
              <AccordionTrigger className="outline-none">
                {menu.title}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="flex flex-col gap-3 pl-4">
                  {menu.subMenus.map((subMenu, subIndex) => (
                    <Link key={subIndex} href={subMenu.url}>
                      {subMenu.title}
                    </Link>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </PopoverContent>
    </Popover>
  );
}
