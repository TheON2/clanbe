"use client";

import {
  Link,
  Navbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";

import { useState } from "react";
import { HeaderLogo } from "./HeaderLogo";
import { HeaderDropdown } from "./HeaderDropdown";
import {
  headerCLANBE,
  headerCOMMUNITY,
  headerBELO,
  headerLEAGUE,
  headerPOINT,
} from "../../../public/data";
import { HeaderEnd } from "./HeaderEnd";

export default function HeaderComponent(categoryData: any) {
  // console.log(categoryData);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="full" className="w-full">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <HeaderLogo />
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <HeaderDropdown
          buttonTitle={headerCLANBE.buttonTitle}
          menuItems={headerCLANBE.menuItems}
        />
        <HeaderDropdown
          buttonTitle={headerCOMMUNITY.buttonTitle}
          menuItems={headerCOMMUNITY.menuItems}
        />
        <HeaderDropdown
          buttonTitle={headerBELO.buttonTitle}
          menuItems={headerBELO.menuItems}
        />
        <HeaderDropdown
          buttonTitle={headerLEAGUE.buttonTitle}
          menuItems={headerLEAGUE.menuItems}
        />
        <HeaderDropdown
          buttonTitle={headerPOINT.buttonTitle}
          menuItems={headerPOINT.menuItems}
        />
      </NavbarContent>
      <HeaderEnd />
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-auto"
              href="#"
              size="md"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
