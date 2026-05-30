"use server"

import { Orders } from "@/components/dashboard/ordersTeste";
import { getToken } from "@/lib/auth";

export default async function Dashboard() {

  const token = await getToken();
  if(!token) {
    return null;
  }

  return <Orders token={token} />
}