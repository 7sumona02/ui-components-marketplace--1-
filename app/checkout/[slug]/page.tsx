"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Package, Copy, Check } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// This would typically come from a database or API
const components = {
  dashboard: {
    id: "dashboard",
    title: "Dashboard UI Kit",
    price: 4999,
    image: "/placeholder.svg?height=200&width=400",
  },
  ecommerce: {
    id: "ecommerce",
    title: "E-commerce Components",
    price: 3999,
    image: "/placeholder.svg?height=200&width=400",
  },
  authentication: {
    id: "authentication",
    title: "Authentication Pack",
    price: 2499,
    image: "/placeholder.svg?height=200&width=400",
  },
  forms: {
    id: "forms",
    title: "Advanced Form Components",
    price: 2999,
    image: "/placeholder.svg?height=200&width=400",
  },
  landing: {
    id: "landing",
    title: "Landing Page Templates",
    price: 3499,
    image: "/placeholder.svg?height=200&width=400",
  },
  mobile: {
    id: "mobile",
    title: "Mobile UI Components",
    price: 2799,
    image: "/placeholder.svg?height=200&width=400",
  },
}

// UPI ID - This would be your actual PhonePe UPI ID
const UPI_ID = "your-phonepe@upi"

interface Component {
  _id?: string
  id?: string
  title: string
  price: number
  image: string
}

// Fetch component function
async function fetchComponent(slug: string): Promise<Component | null> {
  try {
    const response = await fetch(`/api/components/${slug}`);
    if (!response.ok) {
      // If not found in MongoDB, check static components
      return components[slug as keyof typeof components] || null;
    }
    return await response.json();
  } catch (error) {
    // Fallback to static components
    return components[slug as keyof typeof components] || null;
  }
}

export default function CheckoutPage({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const [component, setComponent] = useState<Component | null>(null)
  const [email, setEmail] = useState("")
  const [paymentProof, setPaymentProof] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    fetchComponent(params.slug).then(comp => {
      if (comp) {
        setComponent(comp)
      }
    })
  }, [params.slug])

  if (!component) {
    return <div className="container py-12 text-center">Loading...</div>
  }

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(UPI_ID)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentProof(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      })
      return
    }

    if (!paymentProof) {
      toast({
        title: "Error",
        description: "Please upload payment proof",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // In a real application, you would upload the file to your server here
    // For this example, we'll simulate a successful upload
    setTimeout(() => {
      setIsSubmitting(false)
      router.push(`/success?email=${encodeURIComponent(email)}&component=${encodeURIComponent(component.title)}`)
    }, 1500)
  }

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

      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6 max-w-4xl">
          <div className="flex flex-col items-start space-y-4 mb-8">
            <h1 className="text-3xl font-bold tracking-tighter">Checkout</h1>
            <p className="text-gray-500">Complete your purchase to receive your component files.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div className="flex items-start space-x-4 border rounded-lg p-4">
                <Image
                  src={component.image || "/placeholder.svg"}
                  alt={component.title}
                  width={80}
                  height={80}
                  className="rounded border"
                />
                <div>
                  <h3 className="font-medium">{component.title}</h3>
                  <p className="text-lg font-bold mt-1">₹{(component.price / 100).toFixed(2)}</p>
                </div>
              </div>

              <div className="space-y-4 border rounded-lg p-6">
                <h3 className="text-lg font-medium">Payment Instructions</h3>
                <p className="text-sm text-gray-500">
                  Please make the payment using PhonePe UPI to the ID below, then upload a screenshot of the payment
                  confirmation.
                </p>

                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded border">
                  <span className="font-mono text-sm flex-1">{UPI_ID}</span>
                  <Button variant="outline" size="sm" onClick={handleCopyUPI} className="flex items-center gap-1">
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Copied" : "Copy"}
                  </Button>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-sm text-yellow-800">
                  <p>
                    After payment, please upload a screenshot of your payment confirmation. We'll send the component
                    files to your email once verified.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4 border rounded-lg p-6">
                <h3 className="text-lg font-medium">Your Details</h3>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <p className="text-xs text-gray-500">We'll send the component files to this email address.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payment-proof">Payment Proof</Label>
                  <Input id="payment-proof" type="file" accept="image/*" onChange={handleFileChange} required />
                  <p className="text-xs text-gray-500">Please upload a screenshot of your payment confirmation.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea id="notes" placeholder="Any special requirements or notes for your order" />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : "Submit Order"}
                </Button>
              </form>

              <div className="text-sm text-gray-500 space-y-2">
                <p>By completing this purchase, you agree to our Terms of Service and Privacy Policy.</p>
                <p>If you have any questions, please contact us at support@uimarket.com</p>
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
