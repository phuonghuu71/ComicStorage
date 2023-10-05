"use client";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { ThemeProvider } from "@material-tailwind/react";
import { Toaster } from "react-hot-toast";

export interface ProviderProps {
  children: React.ReactNode;
  session: Session;
}

export function Provider({ children, session }: ProviderProps) {
  const theme = {
    breadcrumbs: {
      styles: {
        base: {
          item: {
            initial: {
              hover: "hover:text-purple-500",
            },
          },
        },
      },
    },
    iconButton: {
      defaultProps: {
        color: "purple",
      },
    },
    button: {
      defaultProps: {
        color: "purple",
      },
    },
  };

  return (
    <SessionProvider session={session}>
      <ThemeProvider value={theme}>{children}</ThemeProvider>
      <Toaster position="top-center" reverseOrder={false} />
    </SessionProvider>
  );
}

export default Provider;
