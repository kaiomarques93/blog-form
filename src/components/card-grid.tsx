'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import parse from 'html-react-parser';



interface CardGridProps {
  items: any[]
}

export function CardGrid({ items }: CardGridProps) {
  const router = useRouter()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {items.map((item) => (
        <Card key={item.id} className="flex flex-col cursor-pointer hover:shadow-md" onClick={() => router.push(`/editar-blog/${item.id}`)}>
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
              {item.featured && (
                <Badge variant="secondary">Featured</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="text-sm text-gray-600 mb-4">{parse(item.description || '')}</div>
            <div className="flex flex-wrap gap-2 mb-4">
              {item.categories.map((category: any) => (
                <Badge key={category} variant="outline">{category}</Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center text-sm text-gray-500">
            <div>
              <span>By {item.author}</span>
              <span className="mx-2">•</span>
              <span>{new Date(item.date).toLocaleDateString()}</span>
            </div>
            <Badge variant={item.active ? "default" : "destructive"}>
              {item.active ? "Active" : "Inactive"}
            </Badge>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

