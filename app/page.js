"use client";
import Hero from "@/components/Hero"
import { LoginForm } from "@/components/LoginForm"
import { selectCurrentToken } from "@/lib/features/auth/authSlice"
import { useAppSelector } from "@/lib/hooks"
import { useRouter } from "next/navigation"

export default function Home() {
  const token = useAppSelector(selectCurrentToken)
  const router = useRouter();

  if(token) {
    router.push("/dashboard");
  }

  return (
    !token && (
      <div className="font-poppins flex min-h-screen">
        <Hero />
      <div className="w-full lg:w-3/5 flex p-10 lg:p-32">
        <LoginForm />
      </div>
    </div>
    )
  )
}