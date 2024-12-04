"use server";

import prisma from "@/lib/prisma";
import { blogPostSchema, blogPostSchemaType } from "@/schemas/blog";
import { currentUser } from '@clerk/nextjs/server'

class UserNotFoundErr extends Error {}



export async function createBlog(data: blogPostSchemaType) {

  const validation = blogPostSchema.safeParse(data);
  if (!validation.success) {
    console.log(validation.error);
    throw new Error("blog not valid");
  }

  const user = await currentUser();
  
  if (!user) {
    console.log("user not found");
    throw new UserNotFoundErr();
  }

  const blogPost = await prisma.blogPost.create({
    data: {
      title: data.title,
      userId: user.id,
      subtitle: data.subtitle,
      description: data.description,
      author: data.author,
      date: data.date,
      image: data.image,
      categories: data.categories,
      active: data.active,
      featured: data.featured,
    },
  });

  if (!blogPost) {
    throw new Error("something went wrong");
  }


  return 1;
}

export async function getBlogs() {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }
  
  return await prisma.blogPost.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      date: "desc",
    },
  });
}

export async function getBlogById(id: string) {
  return await prisma.blogPost.findUnique({
    where: {
      id,
    },
  });
}

export async function updateBlog(id: string, data: Partial<blogPostSchemaType>) {
  return await prisma.blogPost.update({
    where: {
      id,
    },
    data,
  })
}