import { getCategoryData } from "@/service/admin";
import HeaderComponent from "./HeaderComponent";

async function Header() {
  const { category } = await getCategoryData();
  return (
    <>
      <HeaderComponent categoryData={category} />
    </>
  );
}

export default Header;
