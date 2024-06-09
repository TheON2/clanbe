"use client";

import {
  Accordion,
  AccordionItem,
  Card,
  CardBody,
  CardHeader,
  DropdownItem,
  menuItem,
  Navbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";

import Link from "next/link";

import { useState } from "react";
import { HeaderLogo } from "./HeaderLogo";
import { HeaderDropdown } from "./HeaderDropdown";
import {
  headerCLANBE,
  headerCOMMUNITY,
  headerBELO,
  headerLEAGUE,
  headerPOINT,
  headerPROLEAGUE,
} from "../../../public/data";
import { HeaderEnd } from "./HeaderEnd";
import { useRouter } from "next/navigation";

export default function HeaderComponent(categoryData: any) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleMenuItemClick = (href: string) => {
    window.location.href = `${href}`;
    setIsMenuOpen(false); // Close the menu
  };

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="full" className="w-full">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
        <HeaderLogo />
      </NavbarContent>
      <NavbarContent className="hidden md:flex gap-4" justify="center">
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
          buttonTitle={headerPROLEAGUE.buttonTitle}
          menuItems={headerPROLEAGUE.menuItems}
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
      {/* <NavbarContent>
        <HeaderEnd />
      </NavbarContent> */}
      <NavbarMenu className="w-2/3 flex items-center">
        <Accordion variant="splitted">
          {[
            headerCLANBE,
            headerCOMMUNITY,
            headerBELO,
            headerPROLEAGUE,
            headerLEAGUE,
            headerPOINT,
          ].map((category, index) => (
            <AccordionItem
              key={index}
              aria-label={`Accordion ${index + 1}`}
              title={category.buttonTitle}
            >
              {category.menuItems.map((menuItem) => (
                <div
                  key={menuItem.title}
                  onClick={() => handleMenuItemClick(menuItem.href)}
                >
                  <Card className="m-2 dark:bg-gray-dark">
                    <CardHeader>{menuItem.title}</CardHeader>
                  </Card>
                </div>
              ))}
            </AccordionItem>
          ))}
        </Accordion>
      </NavbarMenu>
    </Navbar>
  );
}
