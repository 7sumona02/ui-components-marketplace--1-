import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Package, Zap } from "lucide-react"
import FeaturedComponents from "@/components/featured-components"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Package className="h-6 w-6" />
            <span>UIMarket</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/components" className="text-sm font-medium hover:underline">
              Components
            </Link>
            <Link href="/about" className="text-sm font-medium hover:underline">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:underline">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Premium UI Components for Your Next Project
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Beautifully designed, fully responsive UI components that will help you build your next project
                  faster.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/components">
                  <Button className="px-8">
                    Browse Components
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">Featured Components</h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-lg">
                  Our most popular UI components, ready to use in your projects.
                </p>
              </div>
            </div>
            <FeaturedComponents />
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-white">
                <Code className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Clean Code</h3>
                <p className="text-center text-gray-500">
                  Well-structured, documented code that's easy to integrate into your projects.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-white">
                <Zap className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Fast Delivery</h3>
                <p className="text-center text-gray-500">Receive your components quickly after payment confirmation.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-white">
                <Package className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Ready to Use</h3>
                <p className="text-center text-gray-500">
                  Drop-in components that work out of the box with minimal configuration.
                </p>
              </div>
            </div>
          </div>
        </section>
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
