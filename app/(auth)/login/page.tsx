import LoginForm from "@/components/ui/templates/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login Page",
};

export default function Page() {
  return <LoginForm />;
}
