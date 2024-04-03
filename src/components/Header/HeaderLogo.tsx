import { NavbarBrand } from "@nextui-org/react";
import Image from "next/image";

export const HeaderLogo = () => (
  <NavbarBrand>
    <Image
      alt="Card background"
      src={"/Belogo.png"}
      width={100}
      height={100}
      sizes="sm"
    />
    <p className="font-bold text-inherit text-3xl">CLANBE</p>
  </NavbarBrand>
);
