"use client";

import React from "react";

import DynamicIcon from "../../atoms/DynamicIcon";

import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { Button, Spinner, Typography } from "@material-tailwind/react";

export function LoginForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function loginWithGoogle() {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      // display error message to user
      toast.error("Something went wrong with your login.");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <div className="flex bg-gray-300 min-h-screen items-center justify-center">
        <div className="w-3/12 py-8 px-4 bg-white flex flex-col items-center max-w-md rounded-lg shadow-md">
          <div className="flex flex-col items-center gap-y-4">
            <div className="rounded-full border-4 border-purple-500 p-4 mb-2">
              {isLoading ? (
                <Spinner className="w-12 h-12" color="purple" />
              ) : (
                <DynamicIcon
                  icon="PaintBrushIcon"
                  className="w-12 h-12 text-purple-500"
                />
              )}
            </div>

            <Typography
              as={"h1"}
              className="text-2xl font-medium text-purple-500"
            >
              Welcome to Comics
            </Typography>

            <Typography
              as={"p"}
              className="text-sm font-normal text-center text-gray-500"
            >
              A Web Application for reading manga/anime written by Next.JS
            </Typography>

            <Typography
              as={"p"}
              className="text-sm font-normal text-center text-gray-500"
            >
              .
            </Typography>

            <Typography as={"h2"} className="text-sm font-normal text-gray-500">
              Sign in to your account
            </Typography>
          </div>

          <Typography
            as={"p"}
            className="text-sm font-normal w-full text-center p-4 relative text-gray-500 before:w-1/2 before:h-px before:absolute before:-left-6 before:bg-blue-gray-100 before:top-1/2 before:-translate-y-1/2 after:w-1/2 after:h-px after:absolute after:-right-6 after:bg-blue-gray-100 after:top-1/2 after:-translate-y-1/2 overflow-hidden"
          >
            using
          </Typography>

          <Button
            variant="outlined"
            type="button"
            className="max-w-sm mx-auto w-full flex flex-row items-center justify-center gap-x-2 mb-4"
            onClick={loginWithGoogle}
          >
            <svg
              className="h-6 w-6"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="github"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            <Typography as={"p"} className="font-medium text-base">
              Sign in with Google
            </Typography>
          </Button>

          <Typography
            as={"p"}
            className="text-sm font-normal text-gray-500 text-center"
          >
            version 1.0
          </Typography>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
