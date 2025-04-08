import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, Check } from "lucide-react"
import { notFound } from "next/navigation"
import { MongoClient, ObjectId } from 'mongodb'

// This would typically come from a database or API
const components = {
  dashboard: {
    id: "dashboard",
    title: "Dashboard UI Kit",
    description: "Complete dashboard interface with charts, tables, and navigation components.",
    longDescription:
      "This comprehensive Dashboard UI Kit includes everything you need to build a professional admin panel or dashboard. With over 50 components including charts, tables, navigation elements, and more, you'll have all the building blocks for your next project.",
    price: 4999,
    badge: "Popular",
    image: "/placeholder.svg?height=400&width=800",
    features: [
      "50+ UI components",
      "Responsive design",
      "Dark and light mode",
      "Chart components",
      "Table components with sorting and filtering",
      "Navigation components",
      "Dashboard layouts",
      "TypeScript support",
    ],
  },
  ecommerce: {
    id: "ecommerce",
    title: "E-commerce Components",
    description: "Product cards, shopping cart, checkout forms, and more for online stores.",
    longDescription:
      "Build your online store faster with our E-commerce Components pack. Includes product cards, shopping cart functionality, checkout forms, and everything else you need for a complete e-commerce experience.",
    price: 3999,
    badge: "New",
    image: "/placeholder.svg?height=400&width=800",
    features: [
      "Product cards and grids",
      "Shopping cart components",
      "Checkout forms",
      "Order summary components",
      "Product detail layouts",
      "Wishlist functionality",
      "Category navigation",
      "Mobile-optimized design",
    ],
  },
  authentication: {
    id: "authentication",
    title: "Authentication Pack",
    description: "Login, signup, password reset, and profile management components.",
    longDescription:
      "Our Authentication Pack provides all the UI components you need for user authentication flows. From login and signup forms to password reset and profile management, this pack has you covered.",
    price: 2499,
    badge: null,
    image: "/placeholder.svg?height=400&width=800",
    features: [
      "Login forms",
      "Signup forms",
      "Password reset flow",
      "Email verification",
      "Profile management",
      "Account settings",
      "Social login buttons",
      "Form validation",
    ],
  },
  forms: {
    id: "forms",
    title: "Advanced Form Components",
    description: "Multi-step forms, validation, file uploads, and custom input components.",
    longDescription:
      "Take your forms to the next level with our Advanced Form Components. Includes multi-step forms, validation, file uploads, and a variety of custom input components to enhance your user experience.",
    price: 2999,
    badge: null,
    image: "/placeholder.svg?height=400&width=800",
    features: [
      "Multi-step form wizard",
      "Form validation",
      "File upload components",
      "Custom input fields",
      "Date and time pickers",
      "Auto-complete inputs",
      "Range sliders",
      "Toggle switches",
    ],
  },
  landing: {
    id: "landing",
    title: "Landing Page Templates",
    description: "Hero sections, feature showcases, testimonials, and call-to-action components.",
    longDescription:
      "Create stunning landing pages with our Landing Page Templates. Includes hero sections, feature showcases, testimonial components, and effective call-to-action elements to convert visitors.",
    price: 3499,
    badge: null,
    image: "/placeholder.svg?height=400&width=800",
    features: [
      "Hero section layouts",
      "Feature showcase components",
      "Testimonial sliders",
      "Call-to-action sections",
      "Pricing tables",
      "FAQ accordions",
      "Newsletter signup forms",
      "Contact sections",
    ],
  },
  mobile: {
    id: "mobile",
    title: "Mobile UI Components",
    description: "Touch-friendly components optimized for mobile experiences.",
    longDescription:
      "Optimize your mobile user experience with our Mobile UI Components. These touch-friendly components are designed specifically for mobile interfaces, ensuring a smooth experience on smartphones and tablets.",
    price: 2799,
    badge: null,
    image: "/placeholder.svg?height=400&width=800",
    features: [
      "Mobile navigation menus",
      "Touch-friendly sliders",
      "Mobile-optimized forms",
      "Bottom sheets",
      "Pull-to-refresh components",
      "Mobile cards",
      "Touch gestures support",
      "Responsive layouts",
    ],
  },
}

// Fetch component from MongoDB
// Add type definitions for components
interface ComponentFeatures {
  id: string
  title: string
  description: string
  longDescription: string
  price: number
  badge: string | null
  image: string
  features: string[]
}

interface ComponentsDirectory {
  [key: string]: ComponentFeatures
}

const staticComponents: ComponentsDirectory = {
  dashboard: {
    id: "dashboard",
    title: "Dashboard UI Kit",
    description: "Complete dashboard interface with charts, tables, and navigation components.",
    longDescription:
      "This comprehensive Dashboard UI Kit includes everything you need to build a professional admin panel or dashboard. With over 50 components including charts, tables, navigation elements, and more, you'll have all the building blocks for your next project.",
    price: 4999,
    badge: "Popular",
    image: "/placeholder.svg?height=400&width=800",
    features: [
      "50+ UI components",
      "Responsive design",
      "Dark and light mode",
      "Chart components",
      "Table components with sorting and filtering",
      "Navigation components",
      "Dashboard layouts",
      "TypeScript support",
    ],
  },
  ecommerce: {
    id: "ecommerce",
    title: "E-commerce Components",
    description: "Product cards, shopping cart, checkout forms, and more for online stores.",
    longDescription:
      "Build your online store faster with our E-commerce Components pack. Includes product cards, shopping cart functionality, checkout forms, and everything else you need for a complete e-commerce experience.",
    price: 3999,
    badge: "New",
    image: "/placeholder.svg?height=400&width=800",
    features: [
      "Product cards and grids",
      "Shopping cart components",
      "Checkout forms",
      "Order summary components",
      "Product detail layouts",
      "Wishlist functionality",
      "Category navigation",
      "Mobile-optimized design",
    ],
  },
  authentication: {
    id: "authentication",
    title: "Authentication Pack",
    description: "Login, signup, password reset, and profile management components.",
    longDescription:
      "Our Authentication Pack provides all the UI components you need for user authentication flows. From login and signup forms to password reset and profile management, this pack has you covered.",
    price: 2499,
    badge: null,
    image: "/placeholder.svg?height=400&width=800",
    features: [
      "Login forms",
      "Signup forms",
      "Password reset flow",
      "Email verification",
      "Profile management",
      "Account settings",
      "Social login buttons",
      "Form validation",
    ],
  },
  forms: {
    id: "forms",
    title: "Advanced Form Components",
    description: "Multi-step forms, validation, file uploads, and custom input components.",
    longDescription:
      "Take your forms to the next level with our Advanced Form Components. Includes multi-step forms, validation, file uploads, and a variety of custom input components to enhance your user experience.",
    price: 2999,
    badge: null,
    image: "/placeholder.svg?height=400&width=800",
    features: [
      "Multi-step form wizard",
      "Form validation",
      "File upload components",
      "Custom input fields",
      "Date and time pickers",
      "Auto-complete inputs",
      "Range sliders",
      "Toggle switches",
    ],
  },
  landing: {
    id: "landing",
    title: "Landing Page Templates",
    description: "Hero sections, feature showcases, testimonials, and call-to-action components.",
    longDescription:
      "Create stunning landing pages with our Landing Page Templates. Includes hero sections, feature showcases, testimonial components, and effective call-to-action elements to convert visitors.",
    price: 3499,
    badge: null,
    image: "/placeholder.svg?height=400&width=800",
    features: [
      "Hero section layouts",
      "Feature showcase components",
      "Testimonial sliders",
      "Call-to-action sections",
      "Pricing tables",
      "FAQ accordions",
      "Newsletter signup forms",
      "Contact sections",
    ],
  },
  mobile: {
    id: "mobile",
    title: "Mobile UI Components",
    description: "Touch-friendly components optimized for mobile experiences.",
    longDescription:
      "Optimize your mobile user experience with our Mobile UI Components. These touch-friendly components are designed specifically for mobile interfaces, ensuring a smooth experience on smartphones and tablets.",
    price: 2799,
    badge: null,
    image: "/placeholder.svg?height=400&width=800",
    features: [
      "Mobile navigation menus",
      "Touch-friendly sliders",
      "Mobile-optimized forms",
      "Bottom sheets",
      "Pull-to-refresh components",
      "Mobile cards",
      "Touch gestures support",
      "Responsive layouts",
    ],
  },
}

// Fetch component from MongoDB
interface MongoDBComponent {
  _id: ObjectId
  title: string
  description: string
  longDescription?: string
  price: number
  badge?: string | null
  image: string
  features?: string[]
}

// Update getComponent function with proper typing
async function getComponent(id: string): Promise<ComponentFeatures | MongoDBComponent | null> {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('my-store');
    const componentsCollection = database.collection<MongoDBComponent>('components');
    
    try {
      const objectId = new ObjectId(id);
      const component = await componentsCollection.findOne({ _id: objectId });
      if (component) return component;
    } catch (e) {
      // If not a valid ObjectId, check static components
      return components[id as keyof typeof components] || null;
    }
  } finally {
    await client.close();
  }
  return null;
}

// Update the page component with proper typing
export default async function ComponentPage({ params }: { params: { slug: string } }) {
  const component = await getComponent(params.slug);

  if (!component) {
    notFound()
  }

  // Default features if not provided in MongoDB component
  const features = ('features' in component ? component.features : null) || [
    "Responsive design",
    "Easy integration",
    "Well-documented",
    "Regular updates",
    "Technical support",
    "Custom styling options",
    "Cross-browser compatibility",
    "Performance optimized",
  ];

  // Type guard for price formatting
  const formatPrice = (price: number) => (price / 100).toFixed(2);

  // Rest of the component remains the same, but update the price formatting
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
          <div className="grid gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <div className="relative">
                <Image
                  src={component.image || "/placeholder.svg"}
                  alt={component.title}
                  width={800}
                  height={400}
                  className="rounded-lg border"
                />
                {component.badge && <Badge className="absolute top-4 right-4">{component.badge}</Badge>}
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Features</h2>
                <ul className="space-y-2">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">{component.title}</h1>
                <p className="mt-2 text-2xl font-bold text-primary">₹{formatPrice(component.price)}</p>
              </div>
              <p className="text-gray-500">{component.longDescription || component.description}</p>
              <div className="space-y-4">
                <Link href={`/checkout/${('_id' in component ? component._id : component.id)}`}>
                  <Button size="lg" className="w-full">
                    Buy Now
                  </Button>
                </Link>
                <p className="text-sm text-gray-500 text-center">
                  You'll receive the component files via email after payment
                </p>
              </div>
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
