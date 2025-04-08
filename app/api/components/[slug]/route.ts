import { NextRequest, NextResponse } from "next/server"
import { MongoClient, ObjectId } from 'mongodb'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017'
  const client = new MongoClient(uri)

  try {
    await client.connect()
    const database = client.db('my-store')
    const components = database.collection('components')

    let component
    try {
      const objectId = new ObjectId(params.slug)
      component = await components.findOne({ _id: objectId })
    } catch (e) {
      // Invalid ObjectId format
      return NextResponse.json(null, { status: 404 })
    }

    if (!component) {
      return NextResponse.json(null, { status: 404 })
    }

    return NextResponse.json(component)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch component' },
      { status: 500 }
    )
  } finally {
    await client.close()
  }
}