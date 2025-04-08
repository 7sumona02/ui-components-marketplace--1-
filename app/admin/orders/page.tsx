import { MongoClient } from 'mongodb'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import Image from 'next/image'

async function getOrders() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017'
  const client = new MongoClient(uri)

  try {
    await client.connect()
    const database = client.db('marketplace')
    const orders = database.collection('orders')
    
    // Use aggregation to join with components collection
    const result = await orders.aggregate([
      {
        $lookup: {
          from: 'components',
          let: { componentId: { $toObjectId: '$componentId' } },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', '$$componentId'] }
              }
            }
          ],
          as: 'component'
        }
      },
      {
        $unwind: '$component'
      },
      {
        $sort: { createdAt: -1 }
      }
    ]).toArray()

    return result
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
              <th className="border p-3 text-left">Image</th>
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
                <td className="border p-3">
                  {order.component?.image ? (
                    <Dialog>
                      <DialogTrigger>
                        <div className="relative w-16 h-16 cursor-pointer">
                          <Image
                            src={order.component.image}
                            alt={order.componentTitle || 'Component image'}
                            width={64}
                            height={64}
                            className="rounded-md object-cover"
                          />
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <div className="relative w-full h-[60vh]">
                          <Image
                            src={order.component.image}
                            alt={order.componentTitle || 'Component image'}
                            width={800}
                            height={600}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <span className="text-gray-400">No image</span>
                  )}
                </td>
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