import { NextRequest, NextResponse } from "next/server"
import { MongoClient } from 'mongodb'

export async function POST(request: NextRequest) {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017'
  const client = new MongoClient(uri)

  try {
    const formData = await request.formData()
    
    await client.connect()
    const database = client.db('marketplace')
    const orders = database.collection('orders')

    const orderData = {
      email: formData.get('email'),
      componentId: formData.get('componentId'),
      componentTitle: formData.get('componentTitle'),
      price: formData.get('price'),
      notes: formData.get('notes'),
      paymentProofUrl: '', // Will be updated after file upload
      status: 'pending',
      createdAt: new Date()
    }

    const result = await orders.insertOne(orderData)

    return NextResponse.json({
      success: true,
      orderId: result.insertedId
    })
  } catch (error) {
    console.error('Error saving order:', error)
    return NextResponse.json(
      { error: 'Failed to save order' },
      { status: 500 }
    )
  } finally {
    await client.close()
  }
}