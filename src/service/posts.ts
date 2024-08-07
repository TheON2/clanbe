"use server";

import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

import mongoose from "mongoose";
import Post from "@/models/post";
import PostModel from "@/models/post";
import { revalidateTag } from "next/cache";

const awsConfig = {
  region: process.env.NEXT_PUBLIC_AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY as string,
  },
};

const s3Client = new S3Client(awsConfig);

export type Post = {
  _id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string; // 추가된 필드
  featured: boolean;
  noticed: boolean;
  createdAt: Date; // 자동 생성되는 필드, 선택적으로 설정
  fileUrl: string;
};

export type PostData = {
  title: string;
  fileUrl: string;
  category: string;
  thumbnail: string;
  date: string;
  postId: string;
  featured: boolean;
  noticed: boolean;
  description: string;
  next: Post | null;
  prev: Post | null;
};

export async function getPosts(category:string) {
  // 응답을 JSON으로 변환
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category }),
    next: { tags: ["post"] },
    cache: "no-store",
  });

  const posts = await response.json();
  return posts;
}

export const getAllPosts = async () => {
  try {
    const category = "allposts";
    // 응답을 JSON으로 변환
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category }),
      next: { tags: ["post"] },
      cache: "no-store",
    });

    const posts = await response.json();
    return posts.data;
  } catch (error) {
    console.error("Error fetching posts from MongoDB", error);
    throw new Error("Error fetching posts from MongoDB");
  }
};

export async function getPost(slug: any) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ slug }),
    next: { tags: ["post"] },
  });

  // 응답을 JSON으로 변환
  const post = await response.json();
  const postHTML = await getPostHTML(post.fileUrl);
  const fileNameWithExtension = post.fileUrl.split("/").pop() as string;
  const fileName = fileNameWithExtension.replace(".html", "");

  return { post, postHTML, fileName };
}

export async function getUserSelect() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/users/select`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      next: { tags: ["post"] },
      cache: "no-store",
    }
  );

  return await response.json();
}


export async function getPostData(slug: string): Promise<PostData> {
  const posts = await getAllPosts();

  const post = posts.find((post: any) => post._id.toString() === slug);

  if (!post) throw new Error(`${slug}에 해당하는 포스트를 찾을 수 없음`);

  const index = posts.indexOf(post);
  const next = index > 0 ? posts[index - 1] : null;
  const prev = index < posts.length ? posts[index + 1] : null;
  const fileUrl = post.fileUrl;
  const title = post.title;
  const description = post.description;
  const category = post.category;
  const date = post.createdAt;
  const postId = post._id;
  const featured = post.featured;
  const thumbnail = post.thumbnail;
  const noticed = post.noticed;

  return {
    title,
    category,
    date,
    description,
    featured,
    noticed,
    fileUrl,
    thumbnail,
    next,
    prev,
    postId,
  };
}

export async function getPostHTML(contentUrl: string): Promise<string> {
  const noCacheUrl = `${contentUrl}?nocache=${new Date().getTime()}`;
  let htmlContent;
  try {
    const response = await fetch(noCacheUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    htmlContent = await response.text();
  } catch (error) {
    console.error("Failed to fetch content", error);
  }

  return htmlContent as string;
}


export async function uploadImage(file: File): Promise<string> {
  const fileName = `images/${Date.now()}.png`;
  const buffer = Buffer.from(await file.arrayBuffer());

  await s3Client.send(
    new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
      Key: fileName,
      Body: buffer,
    })
  );
  
  return `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${fileName}`;
}

export async function submitPost(postData: any) {
  //console.log(postData)
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/post/upload`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postData }),
    }
  );
  revalidateTag("post");
  return await response.json();
}

export async function updatePost(postData: any) {
  await fetch(`${process.env.NEXT_PUBLIC_URL}/api/post/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ postData }),
  });
  revalidateTag("post");
}

export async function uploadPostData(
  htmlContent: string,
  contentType: string = "text/html"
): Promise<string> {
  console.log("진입함");
  const fileName = `blog/${Date.now()}.html`;
  const buffer = Buffer.from(htmlContent, "utf-8");

  console.log("buffer" + htmlContent);
  console.log("buffer" + fileName);

  await s3Client.send(
    new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: contentType,
    })
  );

  return `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${fileName}`;
}

export async function updatePostData(
  postName: string,
  htmlContent: string,
  contentType: string = "text/html"
): Promise<string> {
  const safeFileName = encodeURIComponent(postName).replace(/%/g, "") + ".html";
  const buffer = Buffer.from(htmlContent, "utf-8");

  await s3Client.send(
    new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
      Key: `blog/${safeFileName}`,
      Body: buffer,
      ContentType: contentType,
    })
  );

  return `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/blog/${safeFileName}`;
}

export async function deletePostData(postName: string): Promise<void> {
  // URL에서 안전한 파일 이름 생성
  const safeFileName = encodeURIComponent(postName).replace(/%/g, "") + ".html";

  // S3 클라이언트를 사용하여 DeleteObjectCommand 실행
  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
      Key: `blog/${safeFileName}`,
    })
  );

  console.log(`Deleted: blog/${safeFileName}`);
}
