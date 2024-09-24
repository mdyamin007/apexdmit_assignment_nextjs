import { AvatarIcon } from "@radix-ui/react-icons"

function NavBar() {
  return (
    <nav className="flex px-10 py-4 shadow-md">
        <div className="bg-gray-100 flex items-center justify-center px-4 py-2 gap-3 rounded-xl shadow-md">
            <AvatarIcon width={40} height={40} className="text-gray-500"/>
            <p className="text-sm">alexmershel@gmail.com</p>
        </div>
    </nav>
  )
}

export default NavBar