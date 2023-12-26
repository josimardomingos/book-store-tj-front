import { Metadata } from "next";

import BookPage from "@/pages/BookPage";

export const metadata: Metadata = {
  title: "Livros",
};

export default function Page() {
  return <BookPage />;
}
