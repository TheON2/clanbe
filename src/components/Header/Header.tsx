import { getCategoryData } from "@/service/admin";
import HeaderComponent from "./HeaderComponent";

async function Header() {
  const { categories } = await getCategoryData(); // 'categories'로 수정
  return (
    <>
      <HeaderComponent categoryData={categories} />
    </>
  );
}

export default Header;
