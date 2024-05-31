'use client'

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
    <>
      <div>
        <div className="flex flex-col items-center h-screen justify-center text-center my-2">
          <h1 className="font-mono font-bold text-6xl my-4"> 2024 Event Extravaganza</h1>
          <div className="flex mt-1 gap-4">
            <Button asChild className="bg-blue-800 mt-4 text-white">
              <Link href="/sign-up"> Sign up </Link>
            </Button>
            <Button asChild className="bg-blue-800 mt-4 text-white">
              <Link href="/sign-in"> Sign in </Link>
            </Button>
          </div>
          <Image className="my-8 rounded-xl"
            src="/images/event-image.jpg"
            width={700}
            height={700}
            alt="logo"
          />

         
        </div>


      </div>
    </>
  )
}