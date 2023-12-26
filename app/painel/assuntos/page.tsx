import { Metadata } from "next";

import SubjectPage from "@/pages/SubjectPage";

export const metadata: Metadata = {
  title: "Assuntos",
};

export default function Page() {
  return (
    <>
      <SubjectPage />
    </>
    // <div className="my-14 max-w-[95rem] mx-auto w-full flex flex-col gap-4"></div>
  );
}
