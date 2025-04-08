import { MongoClient } from 'mongodb'

async function getOrders() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017'
  const client = new MongoClient(uri)

  try {
    await client.connect()
    const database = client.db('marketplace')
    const orders = database.collection('orders')
    return await orders.find({}).sort({ createdAt: -1 }).toArray()
  } finally {
    await client.close()
  }
}

export default async function AdminOrdersPage() {
  const orders = await getOrders()

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3 text-left">Date</th>
              <th className="border p-3 text-left">Email</th>
              <th className="border p-3 text-left">Component</th>
              <th className="border p-3 text-left">Price</th>
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
                <td className="border p-3">{order.status}</td>
                <td className="border p-3">{order.notes || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}