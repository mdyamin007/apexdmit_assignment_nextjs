import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const description =
    "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account."

export function LoginForm() {
    return (
        <div className="flex flex-col gap-32 w-full lg:max-w-[500px]">
            <div className="flex flex-col space-y-5">
                <h1 className="text-2xl lg:text-4xl font-bold">Welcome back!</h1>
                <p style={{ fontWeight: "400", fontSize: "18px" }} className="text-[#52525B] text-sm lg:text-base">
                    Clarity gives you the blocks & components you need to create a truly professional website.
                </p>
            </div>
            <div>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email" className="font-semibold">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password" className="font-semibold">Password</Label>

                        </div>
                        <Input id="password" type="password" required />
                    </div>
                    <div className="mt-20">
                        <Button type="submit" className="px-10 py-5 font-semibold">
                            Sign in
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
