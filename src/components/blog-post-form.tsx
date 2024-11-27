'use client'

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import CustomEditor from './custom-editor'
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
  image: string | null
  author: string
}

export default function BlogPostForm() {
  const { register, handleSubmit, control, setValue } = useForm<FormData>()
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const onSubmit = (data: FormData) => {
    console.log(data)
    // Here you would typically send the data to your backend
  }

  const handleImageSave = (croppedImage: string) => {
    setValue('image', croppedImage)
    setPreviewImage(croppedImage)
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
        <Label htmlFor="description">Descrição</Label>
        <CustomEditor />
      </div>

      <div>
        <Label htmlFor="auth">Autor</Label>
        <Input id="author" {...register('author', { required: true })} />
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="isActive" {...register('isActive')} />
        <Label htmlFor="isActive">Ativo</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="isFeatured" {...register('isFeatured')} />
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
            <img src={previewImage} alt="Preview" className="max-w-full h-auto" />
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

