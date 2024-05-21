'use server'

import mongoose from "mongoose";
import { Category } from "../../types/types"; // Category 타입 임포트
import CategoryModel from "@/models/category"; // Mongoose 모델 임포트
import { revalidateTag } from "next/cache";


export async function updateUserRole(usernickname: string, role: string) {
  console.log(usernickname,role)
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/user/update`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usernickname, role }),
      next: { tags: ["user"] },
    }
  );
  revalidateTag("user");
  return await response.json();
}

// export const getCategoryData = async (): Promise<{ categories: Category[] }> => {
//   try {
//     // MongoDB 데이터베이스에 연결
//     await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);

//     // 데이터베이스에서 모든 카테고리를 검색
//     const categories = await CategoryModel.find({});

//     // MongoDB 문서를 Category 타입으로 변환
//     const transformedCategories: Category[] = categories.map((doc) => ({
//       buttonTitle: doc.buttonTitle, // MongoDB에서 가져온 데이터 필드
//       menuItems: doc.menuItems.map((item) => ({
//         title: item.title,
//         description: item.description,
//         icon: item.icon,
//         href: item.href
//       }))
//     }));

//     // 변환된 데이터 반환
//     return {
//       categories: transformedCategories
//     };
//   } catch (error) {
//     console.error("Error fetching data from MongoDB", error);
//     throw new Error("Error fetching data from MongoDB");
//   }
// };