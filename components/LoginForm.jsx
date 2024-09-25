"use client";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { setCredentials } from "@/lib/features/auth/authSlice"
import { useLoginMutation } from "@/lib/features/auth/authApiSlice"
import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/hooks/reduxHooks";
import { useToast } from "@/hooks/use-toast"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


const loginSchema = z.object({
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});


export function LoginForm() {
    const { toast } = useToast()

    const router = useRouter()

    const [login, { isLoading }] = useLoginMutation()
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        try {
            const userData = await login(data).unwrap();
            // console.log(userData);
            dispatch(setCredentials({ user: userData.user_data, access_token: userData.access_token }));
            router.push("/dashboard");
        } catch (err) {
            // console.log(err.data.status_message);
            toast({
                variant: "destructive",
                description: err.data.status_message,
            })
        }
    }

    return (
        <div className="flex flex-col gap-32 w-full lg:max-w-[500px]">
            <div className="flex flex-col space-y-5">
                <h1 className="text-2xl lg:text-4xl font-bold">Welcome back!</h1>
                <p style={{ fontWeight: "400", fontSize: "18px" }} className="text-[#52525B] text-sm lg:text-base">
                    Clarity gives you the blocks & components you need to create a truly professional website.
                </p>
            </div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email" className="font-semibold">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            {...register("email")}
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password" className="font-semibold">Password</Label>

                        </div>
                        <Input id="password" type="password" {...register("password")} />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    </div>
                    <div className="mt-20">
                        <Button type="submit" className="px-10 py-5 font-semibold" disabled={isLoading}>
                        {isLoading ? "Signing in..." : "Sign in"}  
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
