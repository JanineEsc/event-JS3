'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { signOut } from "firebase/auth"
import { auth } from "@/firebase/config"

const Header = () => {
  return (
    <nav>
    <ul className="flex justify-between items-center bg-gray-950  py-9 px-4">
      <Link href="/" className="font-semibold  font-mono text-white text-xl "> Events Extravaganza </Link>
      <Link href="/events" className="font-semibold   text-white text-xl ">
      {/* <Image
        width={300}
        height={300}
        alt="logo"
      /> */}
      </Link>
      <div className="flex gap-4 items-center">
        <li className="flex justify-center items-center">
          <Link className="text-white px-9 font-semibold text-sm font-mono hover:text-white hover:bg-blue-400 rounded-full py-2" href="/events">Events List</Link>
          <Button variant="outlineWhite" className="bg-transparent text-sm px-9 font-mono border-white text-white font-semibold hover:text-white hover:bg-blue-400 rounded-full" onClick={async () => {
            await signOut(auth)
          }} >Sign out</Button>
        </li>
      </div>
    </ul>
</nav>
  )
}
export default Header