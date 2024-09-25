"use client"
import { logOut, selectCurrentToken, selectCurrentUser } from "@/lib/features/auth/authSlice"
import { AvatarIcon } from "@radix-ui/react-icons"
import { Button } from "./ui/button"
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks"

function NavBar() {

  const token = useAppSelector(selectCurrentToken)
  const user = useAppSelector(selectCurrentUser)
  const dispatch = useAppDispatch()

  return (
    <nav className="flex px-10 py-4 shadow-md justify-between items-center">
        <div className="bg-gray-100 flex items-center justify-center px-4 py-2 gap-3 rounded-xl shadow-md">
            <AvatarIcon width={40} height={40} className="text-gray-500"/>
            <p className="text-sm">{user.email}</p>
        </div>
        <Button onClick={() => dispatch(logOut())}>Log out</Button>
    </nav>
  )
}

export default NavBar