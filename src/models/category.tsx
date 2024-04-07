import mongoose, { Model } from "mongoose";
import { Category } from "../../types/types";

const categorySchema = new mongoose.Schema(
  {
    buttonTitle: { type: String, required: true },
    menuItems: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        icon: { type: String, required: true },
        href: { type: String, required: true },
      },
    ],
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
