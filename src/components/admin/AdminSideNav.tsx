import Link from "next/link";
import { Button } from "../ui/button";

const sideBarLinks = [
  {
    title: "News",
    href: "/admin/news",
  },
  {
    title: "Videos",
    href: "/admin/videos",
  },
  {
    title: "Guides",
    href: "/admin/guides",
  },
  {
    title: "Exchanges",
    href: "/admin/exchanges",
  },
  {
    title: "Exclusives",
    href: "/admin/exclusives",
  },
  {
    title: "Podcasts",
    href: "/admin/podcasts",
  },
];

export default function AdminSideNav() {
  return (
    <div className="fixed left-0 top-0 h-dvh w-60 border-r pb-6">
      <div className="flex h-full flex-col justify-between">
        <div className="space-y-4 px-3 py-4">
          <div className="flex justify-center">
            {/* <Image src={myumLogo} alt="MYUM" width={150} height={150} className="-m-8" /> */}
            {/* <Triangle size={50} /> */}
          </div>
          <div className="flex flex-col gap-2">
            {sideBarLinks.map((link, index) => (
              <Link href={link.href} key={index}>
                <Button variant={"secondary"} className="w-full">
                  {link.title}
                </Button>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex justify-center px-3">
          <Button variant={"destructive"} className="w-full">
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
