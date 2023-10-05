import Homepage from "@ui/templates/Homepage";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comic Storage",
  description: "A place to store your comics",
};

export default function Page() {
  return <Homepage />;
}
