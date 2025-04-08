import { NextRequest, NextResponse } from "next/server"
import { GridFSBucket, MongoClient } from 'mongodb'

export async function POST(request: NextRequest) {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017'
  const client = new MongoClient(uri)

  try {
    const formData = await request.formData()
    const paymentProofFile = formData.get('paymentProof') as File
    
    await client.connect()
    const database = client.db('my-store')
    const bucket = new GridFSBucket(database, {
      bucketName: 'paymentProofs'
    })
    
    // Upload file to GridFS
    const arrayBuffer = await paymentProofFile.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const filename = `${Date.now()}-${paymentProofFile.name}`
    
    const uploadStream = bucket.openUploadStream(filename, {
      contentType: paymentProofFile.type
    })

    const fileId = await new Promise<string>((resolve, reject) => {
      uploadStream.on('error', reject)
      uploadStream.on('finish', () => resolve(uploadStream.id.toString()))
      uploadStream.end(buffer)
    })

    const orders = database.collection('orders')
    const orderData = {
      email: formData.get('email'),
      componentId: formData.get('componentId'),
      componentTitle: formData.get('componentTitle'),
      price: formData.get('price'),
      notes: formData.get('notes'),
      paymentProofUrl: `/api/files/${fileId}`,
      status: 'pending',
      createdAt: new Date()
    }

    const result = await orders.insertOne(orderData)

    return NextResponse.json({
      success: true,
      orderId: result.insertedId,
      paymentProofUrl: orderData.paymentProofUrl
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