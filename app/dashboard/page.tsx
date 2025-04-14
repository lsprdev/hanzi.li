"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Flashcards } from "@/components/flashcards"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export default function Dashboard() {
  const router = useRouter()

  // Check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem("hanzi-li-user")
    if (!user) {
      router.push("/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("hanzi-li-user")
    router.push("/login")
  }

  return (
    <main className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-red-600">hanzi.li</h1>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
            Back to Home
          </Link>
          <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
      <Flashcards />
    </main>
  )
}
