'use client'

import { useState, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useDropzone } from 'react-dropzone'

export default function SubmitProject() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    badge: '',
    image: '',
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 1
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const formDataToSend = new FormData()
      
      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'image') { // Skip the image field from formData
          formDataToSend.append(key, value)
        }
      })
      
      // Add the image file if it exists
      if (imageFile) {
        formDataToSend.append('image', imageFile)
      }
      
      // Convert price to cents
      formDataToSend.set('price', (parseInt(formData.price) * 100).toString())

      const response = await fetch('/api/projects', {
        method: 'POST',
        body: formDataToSend,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      if (data.success) {
        alert('Component submitted successfully!')
        setFormData({
          title: '',
          description: '',
          price: '',
          badge: '',
          image: '',
        })
        setImageFile(null)
        setImagePreview('')
      } else {
        alert(data.message || 'Failed to submit component')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error submitting component: ' + (error instanceof Error ? error.message : 'Unknown error'))
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Submit New Component</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Component Title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Component description"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (₹)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="4999"
                min="0"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="badge">Badge (Optional)</Label>
              <Input
                id="badge"
                name="badge"
                value={formData.badge}
                onChange={handleChange}
                placeholder="e.g., New, Popular"
              />
            </div>

            <div className="space-y-2">
              <Label>Image Upload</Label>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
                  ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
              >
                <input {...getInputProps()} />
                {imagePreview ? (
                  <div className="space-y-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mx-auto max-h-40 object-contain"
                    />
                    <p className="text-sm text-gray-500">Click or drag to replace</p>
                  </div>
                ) : (
                  <div>
                    <p>Drag & drop an image here, or click to select</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Supports: JPG, PNG, GIF, WebP
                    </p>
                  </div>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full">
              Submit Component
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}