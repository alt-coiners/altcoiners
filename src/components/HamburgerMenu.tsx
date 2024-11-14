import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { api } from "@/trpc/server";
import { MENU_NAV_LINKS } from "@/utils/constant";
import { Menu } from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default async function HamburgerMenu() {
  const [newsCategories, videoCategories, guideCategories] = await Promise.all([
    api.news.getCategories(),
    api.video.getCategories(),
    api.guide.getCategories(),
  ]);

  const SheetTriggerLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <Link href={href}>
      <SheetTrigger className="hover:underline">{children}</SheetTrigger>
    </Link>
  );

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="size-6 text-primary lg:hidden" />
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetDescription>
            <Accordion
              type="single"
              collapsible
              className="w-full text-left text-lg"
            >
              {/* create a all accordian which contain all the other titles and their submenus */}
              <AccordionItem value="menu-all" className="outline-none">
                <AccordionTrigger className="outline-none">
                  All
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="flex flex-col gap-3 pl-4">
                    <ul key={newsCategories.title}>
                      <SheetTriggerLink href={newsCategories.href ?? ""}>
                        {newsCategories.title}
                      </SheetTriggerLink>
                    </ul>
                    <ul key={videoCategories.title}>
                      <SheetTriggerLink href={videoCategories.href ?? ""}>
                        {videoCategories.title}
                      </SheetTriggerLink>
                    </ul>
                    <ul key={guideCategories.title}>
                      <SheetTriggerLink href={guideCategories.href ?? ""}>
                        {guideCategories.title}
                      </SheetTriggerLink>
                    </ul>
                    {MENU_NAV_LINKS.map((menu, index) => (
                      <ul key={index}>
                        <SheetTriggerLink href={menu.href ?? ""}>
                          {menu.title}
                        </SheetTriggerLink>
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
                      <SheetTriggerLink key={subIndex} href={subMenu.url}>
                        {subMenu.title}
                      </SheetTriggerLink>
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
                      <SheetTriggerLink key={subIndex} href={subMenu.url}>
                        {subMenu.title}
                      </SheetTriggerLink>
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
                      <SheetTriggerLink key={subIndex} href={subMenu.url}>
                        {subMenu.title}
                      </SheetTriggerLink>
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
                        <SheetTriggerLink key={subIndex} href={subMenu.url}>
                          {subMenu.title}
                        </SheetTriggerLink>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
