"use client";

import { Breadcrumbs, Typography } from "@material-tailwind/react";
import { useRouter } from "next/navigation";

/* eslint-disable-next-line */
export interface BreadcrumbProps {
  desc: string | React.ReactNode;
  href: string | "";
}

export function BreadcrumbList({ data }: { data: BreadcrumbProps[] }) {
  const router = useRouter();
  return (
    <Breadcrumbs
      className="bg-transparent pt-0"
      separator={
        <Typography as={"p"} className="text-sm">
          /
        </Typography>
      }
    >
      {data.map((value, i) => (
        <Typography
          key={i}
          as={"p"}
          onClick={() => {
            if (i === data.length - 1) return;
            router.push(value.href);
          }}
          className="text-sm font-medium"
        >
          {value.desc}
        </Typography>
      ))}
    </Breadcrumbs>
  );
}

export default BreadcrumbList;
