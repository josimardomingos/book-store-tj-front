import { Metadata } from "next";

import AuthorPage from "@/pages/AuthorPage";

export const metadata: Metadata = {
  title: "Autores",
};

export default function Page() {
  return <AuthorPage />;
}
