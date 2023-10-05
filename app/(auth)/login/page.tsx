import { LoginForm } from "@ui/templates";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login Page",
};

export default function Page() {
  return <LoginForm />;
}
