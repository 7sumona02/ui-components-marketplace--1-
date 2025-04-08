import { MongoClient } from 'mongodb'
import Link from 'next/link'
import { Package } from 'lucide-react'

async function getOrders() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017'
  const client = new MongoClient(uri)

  try {
    await client.connect()
    const database = client.db('my-store')
    const orders = database.collection('orders')
    
    const result = await orders.find().sort({ createdAt: -1 }).toArray()
    return result
  } finally {
    await client.close()
  }
}

export default async function AdminPage() {
  const orders = await getOrders()

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Package className="h-6 w-6" />
            <span>UIMarket Admin</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6">Orders</h1>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3 text-left">Date</th>
                  <th className="border p-3 text-left">Email</th>
                  <th className="border p-3 text-left">Component</th>
                  <th className="border p-3 text-left">Price</th>
                  <th className="border p-3 text-left">Twitter DM</th>
                  <th className="border p-3 text-left">Status</th>
                  <th className="border p-3 text-left">Notes</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id.toString()} className="hover:bg-gray-50">
                    <td className="border p-3">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="border p-3">{order.email}</td>
                    <td className="border p-3">{order.componentTitle}</td>
                    <td className="border p-3">₹{(order.price / 100).toFixed(2)}</td>
                    <td className="border p-3">
                      <a
                        href="https://twitter.com/weebdev_san"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        @weebdev_san
                      </a>
                    </td>
                    <td className="border p-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.status === 'completed' 
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="border p-3">{order.notes || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          UIMarket Admin Dashboard © 2025
        </div>
      </footer>
    </div>
  )
}