import { MongoClient } from 'mongodb';
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package } from "lucide-react"

const components = [
  {
    id: "dashboard",
    title: "Dashboard UI Kit",
    description: "Complete dashboard interface with charts, tables, and navigation components.",
    price: 4999,
    badge: "Popular",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "ecommerce",
    title: "E-commerce Components",
    description: "Product cards, shopping cart, checkout forms, and more for online stores.",
    price: 3999,
    badge: "New",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "authentication",
    title: "Authentication Pack",
    description: "Login, signup, password reset, and profile management components.",
    price: 2499,
    badge: null,
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "forms",
    title: "Advanced Form Components",
    description: "Multi-step forms, validation, file uploads, and custom input components.",
    price: 2999,
    badge: null,
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "landing",
    title: "Landing Page Templates",
    description: "Hero sections, feature showcases, testimonials, and call-to-action components.",
    price: 3499,
    badge: null,
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "mobile",
    title: "Mobile UI Components",
    description: "Touch-friendly components optimized for mobile experiences.",
    price: 2799,
    badge: null,
    image: "/placeholder.svg?height=200&width=400",
  },
]

// Fetch components from MongoDB
async function getComponents() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('my-store');
    const components = database.collection('components');
    return await components.find({}).toArray();
  } finally {
    await client.close();
  }
}

export default async function ComponentsPage() {
  const dbComponents = await getComponents();

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

      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-start space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter">All Components</h1>
            <p className="text-gray-500">Browse our collection of premium UI components.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            {dbComponents.map((component) => (
              <Card key={component._id.toString()} className="overflow-hidden">
                <div className="relative">
                  <Image
                    src={component.image || "/placeholder.svg"}
                    alt={component.title}
                    width={400}
                    height={200}
                    className="w-full object-cover"
                  />
                  {component.badge && <Badge className="absolute top-2 right-2">{component.badge}</Badge>}
                </div>
                <CardHeader>
                  <CardTitle>{component.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">{component.description}</p>
                  <p className="mt-4 text-xl font-bold">₹{(component.price / 100).toFixed(2)}</p>
                </CardContent>
                <CardFooter>
                  <Link href={`/components/${component._id}`} className="w-full">
                    <Button className="w-full">View Details</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
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
