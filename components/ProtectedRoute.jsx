"use client";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function ProtectedRoute({children}) {
    const router = useRouter();
    const accessToken = useAppSelector(state => state.auth.access_token);
  
    useEffect(() => {
      if (!accessToken) {
        router.replace("/");
      }
    }, [accessToken, router]);
  
    return accessToken ? children : null;
}

export default ProtectedRoute