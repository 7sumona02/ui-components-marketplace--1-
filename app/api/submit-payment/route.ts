import { type NextRequest, NextResponse } from "next/server"
import { MongoClient } from 'mongodb'

// MongoDB connection string - replace with your actual connection string
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const client = new MongoClient(uri)

export async function POST(request: NextRequest) {
  try {
    // Connect to MongoDB and verify connection
    await client.connect()
    await client.db("admin").command({ ping: 1 })
    console.log("Successfully connected to MongoDB.")
    
    const database = client.db('my-store')
    const payments = database.collection('payments')

    // Parse the request body
    const data = await request.json()

    // Store payment information in MongoDB
    const result = await payments.insertOne({
      ...data,
      createdAt: new Date(),
      status: 'pending'
    })

    return NextResponse.json({
      success: true,
      message: "Payment proof received. We'll process your order shortly.",
      orderId: result.insertedId
    })
  } catch (error) {
    console.error("Error processing payment submission:", error)
    return NextResponse.json({ success: false, message: "Failed to process payment submission" }, { status: 500 })
  } finally {
    // Close the connection when done
    await client.close()
  }
}
