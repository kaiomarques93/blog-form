'use client'

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { base64ToFile, uploadImageToS3 } from "@/lib/upload-image-to-s3"
import { blogPostSchemaType } from "@/schemas/blog"
import { CustomEditor } from "./custom-editor"
import { ImageUploadModal } from './image-upload-modal'


const categories = [
  'Estudos de Caso',
  'Na Mídia',
  'Lançamentos',
  'Recursos',
  'Gestão Digital',
]

type FormData = {
  title: string
  subtitle: string
  description: string
  isActive: boolean
  isFeatured: boolean
  categories: string[]
  image: string
  author: string
  date: string
}

export default function BlogPostForm() {
  const { register, handleSubmit, control, setValue, watch } = useForm<FormData>()
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const onSubmit = async (data: FormData) => {
    try {
      console.clear()
      console.log(data)
      
      const file = base64ToFile(data.image, data.title + '.jpg')
      
      const res = await uploadImageToS3(file)
      console.log(res)
      
      const finalBlog: blogPostSchemaType = {
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        active: data.isActive,
        featured: data.isFeatured,
        categories: data.categories,
        image: res,
        author: data.author,
        date: data.date,
      }

      
      console.log(finalBlog)
      
    } catch (error) {
      console.error("An error occurred during form submission:", error)
      // Optionally, you can display an error message to the user
      alert("There was an error submitting the form. Please try again.")
    }
  }

  const handleImageSave = (croppedImage: string) => {
    setValue('image', croppedImage)
    setPreviewImage(croppedImage)
  }

  const [text, setText] = useState('')

  const handleSetDescription = (description: string) => {
    setValue('description', description)
    setText(description)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-2xl mx-auto">
      <div>
        <Label htmlFor="title">Título</Label>
        <Input id="title" {...register('title', { required: true })} />
      </div>

      <div>
        <Label htmlFor="subtitle">Subtítulo</Label>
        <Input id="subtitle" {...register('subtitle', { required: true })} />
      </div>

      <div>
        <Label htmlFor="date">Data</Label>
        <Input id="date" {...register('date', { required: true })} />
      </div>

      <div>
        <Label htmlFor="description">Descrição</Label>
        <CustomEditor 
          text={text}
          handleChange={handleSetDescription}
        />
      </div>

      <div>
        <Label htmlFor="auth">Autor</Label>
        <Input id="author" {...register('author', { required: true })} />
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="isActive" 
          checked={watch('isActive')}
          onCheckedChange={(checked) => setValue('isActive', checked)}
        />
        <Label htmlFor="isActive">Ativo</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="isFeatured" 
          checked={watch('isFeatured')}
          onCheckedChange={(checked) => setValue('isFeatured', checked)}
        />
        <Label htmlFor="isFeatured">Featured</Label>
      </div>

      <div>
        <Label htmlFor="categories">Categorias</Label>
        <Controller
          name="categories"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={field.value?.includes(category)}
                    onCheckedChange={(checked) => {
                      const updatedCategories = checked
                        ? [...(field.value || []), category]
                        : (field.value || []).filter((val: string) => val !== category);
                      field.onChange(updatedCategories);
                    }}
                  />
                  <Label htmlFor={`category-${category}`}>{category}</Label>
                </div>
              ))}
            </div>
          )}
        />
      </div>

      <div>
        <Label htmlFor="image">Imagem (16:9 ratio)</Label>
        <Button type="button" onClick={() => setIsImageModalOpen(true)}>
          Upload imagem
        </Button>
        {previewImage && (
          <div className="mt-2">
            <img id='cropped-image' src={previewImage} alt="Preview" className="max-w-full h-auto" />
          </div>
        )}
      </div>

      <Button type="submit">Salvar</Button>

      <ImageUploadModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onSave={handleImageSave}
      />
    </form>
  )
}

