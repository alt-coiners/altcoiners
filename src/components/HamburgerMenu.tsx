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
import { MENU_NAV_LINKS } from "@/utils/constant";
import { Menu } from "lucide-react";
import Link from "next/link";

export default function HamburgerMenu() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Menu className="size-6 text-primary lg:hidden" />
      </PopoverTrigger>
      <PopoverContent className="w-screen">
        <Accordion type="single" collapsible className="w-full">
          {MENU_NAV_LINKS.map((menu, index) => (
            <AccordionItem key={index} value={`menu-${index}`}>
              <AccordionTrigger>{menu.title}</AccordionTrigger>
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
