"use client";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { setCredentials } from "@/lib/features/auth/authSlice"
import { useLoginMutation } from "@/lib/features/auth/authApiSlice"
import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/lib/hooks";


export function LoginForm() {
    const userRef = useRef()
    const errRef = useRef()
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const router = useRouter()

    const [login, {isLoading}] = useLoginMutation()
    const dispatch = useAppDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await login({email, password}).unwrap();
            console.log(userData);
            dispatch(setCredentials({ user: userData.user_data, access_token: userData.access_token }));
            router.push("/dashboard");
        } catch (err) {
            console.log(err);
            setErrorMsg("Invalid username or password");
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
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email" className="font-semibold">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password" className="font-semibold">Password</Label>

                        </div>
                        <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="mt-20">
                        <Button type="submit" onClick={handleSubmit} className="px-10 py-5 font-semibold">
                            Sign in
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
