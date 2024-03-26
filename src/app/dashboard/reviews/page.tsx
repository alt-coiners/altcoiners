import BreadcrumbComponent from "@/components/breadcrumb";

export default function Reviews() {
  const breadcrumbs = [
    {
      name: "Reviews",
      url: "/dashboard/reviews",
    },
  ];

  return (
    <div className="mx-auto flex flex-col gap-4 sm:max-w-lg md:max-w-xl xl:max-w-4xl 2xl:max-w-5xl">
      <BreadcrumbComponent links={breadcrumbs} />
      <p className="w-[90%] text-pretty text-xl font-bold text-primary-dark lg:text-2xl">
        Reviews
      </p>
    </div>
  );
}
