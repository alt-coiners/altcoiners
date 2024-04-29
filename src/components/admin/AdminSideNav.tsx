import { useAdminLoginStore } from "@/utils/store/adminLogin";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  {
    title: "Banners",
    href: "/admin/banners",
  },
];

export default function AdminSideNav() {
  const { setIsLoggedIn } = useAdminLoginStore();
  const router = useRouter();

  return (
    <div className="fixed left-0 top-0 h-dvh w-60 border-r pb-6">
      <div className="flex h-full flex-col justify-between">
        <div className="space-y-4 px-3 py-4">
          <div className="flex justify-center">
            <Image
              src="/images/altcoiners-logo.svg"
              alt="logo"
              width={180}
              height={180}
              className=""
              quality={100}
            />
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
          <Button
            variant={"destructive"}
            className="w-full"
            onClick={() => {
              setIsLoggedIn(false);
              router.push("/admin/login");
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
