import { NavbarBrand } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ThemeSwitcher } from "../ThemeSwitcher";

export const HeaderLogo = () => {
  const router = useRouter();

  return (
    <NavbarBrand
      onClick={() => router.push("/")}
      className="cursor-pointer hover:opacity-75"
    >
      <Image
        alt="Card background"
        src={"/Belogo.png"}
        width={100}
        height={100}
        sizes="sm"
        style={{ minWidth: "100px", minHeight: "60px" }}
      />
      <p className="font-bold text-inherit text-3xl">CLANBE</p>
      <div className="block sm:hidden">
        <ThemeSwitcher />
      </div>
    </NavbarBrand>
  );
};
