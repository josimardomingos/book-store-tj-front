import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "./api/auth/[...nextauth]/route";

import AuthenticationPage from "@/pages/Authentication";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/painel");

  return <AuthenticationPage />;
}
