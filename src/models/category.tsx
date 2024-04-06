import mongoose, { Model } from "mongoose";
import { Category } from "../../types/types";

const categorySchema = new mongoose.Schema(
  {
    category: String, // 속한 카테고리
    title: String, // 카테고리 항목의 제목
    description: String, // 메뉴 항목의 설명
    icon: String, // 메뉴 항목의 아이콘
    href: String, // 라우터 링크
  },
  {
    timestamps: true, // createdAt 및 updatedAt 타임스탬프 자동 생성
  }
);

let CategoryModel: Model<Category>;

if (mongoose.modelNames().includes("category")) {
  // 모델이 이미 존재하는 경우, 해당 모델을 가져옵니다.
  CategoryModel = mongoose.model<Category>("category");
} else {
  // 모델이 존재하지 않는 경우, 새로운 모델을 생성합니다.
  CategoryModel = mongoose.model<Category>(
    "category",
    categorySchema,
    "category"
  );
}

export default CategoryModel;
