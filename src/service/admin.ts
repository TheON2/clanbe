import mongoose from "mongoose";
import { Category } from "../../types/types";
import { Document } from "mongoose";
import CategoryModel from "@/models/category";

export const getCategoryData = async () => {
  try {
    // MongoDB 데이터베이스에 연결
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);

    // 데이터베이스에서 모든 게시글을 검색
    const categories = await CategoryModel.find({});

    console.log(categories)

    const transformedCategories: Category[] = categories.map((category: Document) => ({
      ...category.toObject(),
      _id: category._id.toString(), // MongoDB ObjectId를 문자열로 변환
    }));

    console.log(transformedCategories)

    // 데이터 변환 로직은 필요에 따라 조정
    return {
      category:transformedCategories
    };
  } catch (error) {
    console.error("Error fetching data from MongoDB", error);
    throw new Error("Error fetching data from MongoDB");
  }
};
