import Hero from "@/components/Hero"
import { LoginForm } from "@/components/LoginForm"

export default function Home() {
  return (
    <div className="font-poppins flex min-h-screen">
        <Hero />
      <div className="w-full lg:w-3/5 flex p-10 lg:p-32">
        <LoginForm />
      </div>
    </div>
  )
}