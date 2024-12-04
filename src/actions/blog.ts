"use server";

import prisma from "@/lib/prisma";
import { blogPostSchema, blogPostSchemaType } from "@/schemas/blog";
import { currentUser } from '@clerk/nextjs/server'

class UserNotFoundErr extends Error {}



export async function CreateBlog(data: blogPostSchemaType) {
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

  return blogPost.id;
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

export async function GetBlogById(id: string) {
  return await prisma.blogPost.findUnique({
    where: {
      id,
    },
  });
}

export async function UpdateFormContent(id: string, jsonContent: string) {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  return await prisma.blogPost.update({
    where: {
      userId: user.id,
      id,
    },
    data: {
      description: jsonContent,
    },
  });
}

// export async function PublishForm(id: number) {
//   const user = await currentUser();
//   if (!user) {
//     throw new UserNotFoundErr();
//   }

//   return await prisma.form.update({
//     data: {
//       published: true,
//     },
//     where: {
//       userId: user.id,
//       id,
//     },
//   });
// }

// export async function GetFormContentByUrl(formUrl: string) {
//   return await prisma.form.update({
//     select: {
//       content: true,
//     },
//     data: {
//       visits: {
//         increment: 1,
//       },
//     },
//     where: {
//       shareURL: formUrl,
//     },
//   });
// }

// export async function SubmitForm(formUrl: string, content: string) {
//   return await prisma.form.update({
//     data: {
//       submissions: {
//         increment: 1,
//       },
//       FormSubmissions: {
//         create: {
//           content,
//         },
//       },
//     },
//     where: {
//       shareURL: formUrl,
//       published: true,
//     },
//   });
// }

// export async function GetFormWithSubmissions(id: number) {
//   const user = await currentUser();
//   if (!user) {
//     throw new UserNotFoundErr();
//   }

//   return await prisma.form.findUnique({
//     where: {
//       userId: user.id,
//       id,
//     },
//     include: {
//       FormSubmissions: true,
//     },
//   });
// }
