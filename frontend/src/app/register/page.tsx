import { RegisterForm } from "@/components/forms/register-form";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";


export default async function RegisterPage() {

  const user = await getUser();
  if(user) {
    redirect("/dashboard");
  }
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-app-background px-4 py-8">
      <div className="w-full">
        <RegisterForm />
      </div>
    </div>
  );
}