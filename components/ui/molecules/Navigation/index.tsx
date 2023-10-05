"use client";

import React from "react";

import {
  Navbar,
  Typography,
  IconButton,
  Collapse,
} from "@material-tailwind/react";

export interface NavProps {
  slogan: string;
  children: React.ReactNode;
  mobileChildren: React.ReactNode;
}

export function Navigation({ slogan, children, mobileChildren }: NavProps) {
  const [openNav, setOpenNav] = React.useState<boolean>(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );

    return () => {
      window.removeEventListener(
        "resize",
        () => window.innerWidth >= 960 && setOpenNav(false)
      );
    };
  }, []);

  return (
    <Navbar className="py-2 px-5 lg:py-4 lg:px-8 rounded-2xl mb-4 border border-blue-gray-100 shadow-none">
      <div className="mx-auto gap-x-4 flex items-center justify-between text-blue-gray-900">
        <Typography
          as={"a"}
          href="/"
          className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-xl"
        >
          {slogan}
        </Typography>

        {children}

        <IconButton
          variant="text"
          className="h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>

      <Collapse open={openNav}>
        <div className="container mx-auto my-2">{mobileChildren}</div>
      </Collapse>
    </Navbar>
  );
}

export default Navigation;
