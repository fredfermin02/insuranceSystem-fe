
import { Metadata } from "next"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { UserNav } from "./components/user-nav"





export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
}

export default function DashboardPage() {
  return (
    <>
      
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <div className="ml-auto flex items-center space-x-4">

              <UserNav />
            </div>
          </div>
        </div>

       
      </div>
    </>
  )
}