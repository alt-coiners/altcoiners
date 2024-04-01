import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbComponentProps {
  links: {
    name: string;
    url: string;
  }[];
}

export default function BreadcrumbComponent({
  links,
}: BreadcrumbComponentProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {links.map((link, index) => (
          <>
            <BreadcrumbItem key={index} className="text-xs">
              <BreadcrumbLink href={link.url}>
                {link.name.length > 40
                  ? link.name.substring(0, 40) + "..."
                  : link.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index + 1 !== links.length && <BreadcrumbSeparator key={index} />}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
