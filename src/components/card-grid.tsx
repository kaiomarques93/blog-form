'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import parse from 'html-react-parser'
import { Button } from './ui/button'
import { Pencil, Trash2 } from 'lucide-react'

interface CardGridProps {
  items: any[]
}

export function CardGrid({ items }: CardGridProps) {
  const router = useRouter()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {items.map((item) => (
        <Card key={item.id} className="flex flex-col ">
          <CardHeader>
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover rounded-t-lg mb-4"
              />
            )}
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.subtitle}</CardDescription>
              </div>
              {item.featured && <Badge variant="secondary">Featured</Badge>}
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="text-sm text-gray-600 mb-4 max-h-[250px] overflow-y-auto">
              {parse(item.description || '')}
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {item.categories.map((category: any) => (
                <Badge key={category} variant="outline">
                  {category}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center text-sm text-gray-500">
            <div>
              <span>By {item.author}</span>
              <span className="mx-2">•</span>
              <span>{new Date(item.date).toLocaleDateString()}</span>
            </div>
            <Badge variant={item.active ? 'default' : 'destructive'}>
              {item.active ? 'Active' : 'Inactive'}
            </Badge>
            <div className="flex gap-2 ml-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push(`/editar-blog/${item.id}`)}
                title="Edit post"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                // onClick={() => onDelete?.(item.id)}
                title="Delete post"
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
