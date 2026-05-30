import { LoginForm } from "@/components/forms/login-form";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";


export default async function LoginPage() {

  const user = await getUser();

  if(user) {
    redirect("/dashboard");
  }
  
  return (
    <div className="flex items-center justify-center h-screen bg-app-background px-4 py-8">
      <div className="w-full">
        <LoginForm />
      </div>
    </div>
  );
}