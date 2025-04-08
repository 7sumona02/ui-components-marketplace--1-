"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Package, CheckCircle, ArrowLeft } from "lucide-react"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || "your email"
  const component = searchParams.get("component") || "the component"

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Package className="h-6 w-6" />
            <span>UIMarket</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 py-12 flex items-center justify-center">
        <div className="container px-4 md:px-6 max-w-md">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Order Received!</h1>
              <p className="text-gray-500">
                Thank you for your purchase. We've received your payment proof and will send{" "}
                <strong>{component}</strong> to <strong>{email}</strong> after verification.
              </p>
            </div>

            <div className="bg-gray-50 border rounded-lg p-4 text-sm">
              <p className="font-medium">What happens next?</p>
              <ul className="mt-2 space-y-1 text-gray-500 text-left list-disc pl-5">
                <li>We'll verify your payment (usually within 24 hours)</li>
                <li>Once verified, we'll email the component files to you</li>
                <li>You can use the files in your projects as per our license terms</li>
              </ul>
            </div>

            <div className="pt-4">
              <Link href="/">
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            <span className="text-sm font-medium">UIMarket © 2025</span>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/terms" className="text-gray-500 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-gray-500 hover:underline">
              Privacy
            </Link>
            <Link href="/contact" className="text-gray-500 hover:underline">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
