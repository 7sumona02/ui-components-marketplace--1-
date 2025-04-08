import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from 'mongodb';
import { promises as fs } from 'fs';
import path from 'path';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const client = new MongoClient(uri);

export async function POST(request: NextRequest) {
  try {
    // Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true });

    const formData = await request.formData();
    let imageUrl = '';

    // Handle image upload
    const imageFile = formData.get('image') as File;
    if (imageFile) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const filename = `${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
      const filepath = path.join(uploadsDir, filename);
      
      await fs.writeFile(filepath, buffer);
      imageUrl = `/uploads/${filename}`;
    }

    // Connect to MongoDB
    await client.connect();
    const database = client.db('my-store');
    const components = database.collection('components');

    // Prepare data for MongoDB
    const componentData = {
      title: formData.get('title'),
      description: formData.get('description'),
      price: parseInt(formData.get('price') as string),
      badge: formData.get('badge') || null,
      image: imageUrl,
      createdAt: new Date()
    };

    // Insert into MongoDB
    const result = await components.insertOne(componentData);

    return NextResponse.json({
      success: true,
      message: "Component added successfully",
      componentId: result.insertedId
    });

  } catch (error) {
    console.error("Error processing submission:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to process submission",
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}