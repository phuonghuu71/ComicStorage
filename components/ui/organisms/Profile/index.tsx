"use client";

import React from "react";

import ProfileMenu, { ProfileMenuItemProps } from "../../molecules/ProfileMenu";

import { signIn, useSession } from "next-auth/react";
import { Button, Spinner } from "@material-tailwind/react";

export interface ProfileProps {
  profileMenuItems: ProfileMenuItemProps[];
}

export function Profile({ profileMenuItems }: ProfileProps) {
  const { data: session, status } = useSession();

  async function signInWithGoogle() {
    setIsLoading(true);

    try {
      await signIn("google");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  return (
    <>
      {status === "authenticated" ? (
        <ProfileMenu
          className="hidden lg:flex"
          avatarPhoto={
            session.user.image ||
            "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          }
          profileMenuItems={profileMenuItems}
        />
      ) : status === "unauthenticated" ? (
        <Button variant="gradient" size="sm" onClick={signInWithGoogle}>
          {isLoading ? <Spinner className="w-4 h-4" /> : <span>LOGIN</span>}
        </Button>
      ) : (
        <Spinner className="w-4 h-4" />
      )}
    </>
  );
}

export default Profile;
