import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const featuredComponents = [
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
]

export default function FeaturedComponents() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
      {featuredComponents.map((component) => (
        <Card key={component.id} className="overflow-hidden">
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
            <Link href={`/components/${component.id}`} className="w-full">
              <Button className="w-full">View Details</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
