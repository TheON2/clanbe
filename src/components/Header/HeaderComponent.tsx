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
} from "../../../public/data";
import { HeaderEnd } from "./HeaderEnd";
import { useRouter } from "next/navigation";
import UserNav2 from "../UserNav2";

export default function HeaderComponent(categoryData: any) {
  // console.log(categoryData);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

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
      <NavbarContent>
        <HeaderEnd />
      </NavbarContent>
      <NavbarMenu className="w-2/3">
        <Accordion variant="splitted">
          <AccordionItem
            key="1"
            aria-label="Accordion 1"
            title={headerCLANBE.buttonTitle}
          >
            {headerCLANBE.menuItems.map((menuItem) => (
              <Link key={menuItem.title} href={menuItem.href}>
                <Card
                  className="m-2 dark:bg-gray-dark"
                  key={menuItem.title}
                  onClick={() => router.push(menuItem.href)}
                >
                  <CardHeader>{menuItem.title}</CardHeader>
                </Card>
              </Link>
            ))}
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="Accordion 2"
            title={headerCOMMUNITY.buttonTitle}
          >
            {headerCOMMUNITY.menuItems.map((menuItem) => (
              <Link key={menuItem.title} href={menuItem.href}>
                <Card
                  className="m-2 dark:bg-gray-dark"
                  key={menuItem.title}
                  onClick={() => router.push(menuItem.href)}
                >
                  <CardHeader>{menuItem.title}</CardHeader>
                </Card>
              </Link>
            ))}
          </AccordionItem>
          <AccordionItem
            key="3"
            aria-label="Accordion 3"
            title={headerBELO.buttonTitle}
          >
            {headerBELO.menuItems.map((menuItem) => (
              <Link key={menuItem.title} href={menuItem.href}>
                <Card
                  className="m-2 dark:bg-gray-dark"
                  key={menuItem.title}
                  onClick={() => router.push(menuItem.href)}
                >
                  <CardHeader>{menuItem.title}</CardHeader>
                </Card>
              </Link>
            ))}
          </AccordionItem>
          <AccordionItem
            key="4"
            aria-label="Accordion 4"
            title={headerLEAGUE.buttonTitle}
          >
            {headerLEAGUE.menuItems.map((menuItem) => (
              <Link key={menuItem.title} href={menuItem.href}>
                <Card
                  className="m-2 dark:bg-gray-dark"
                  key={menuItem.title}
                  onClick={() => router.push(menuItem.href)}
                >
                  <CardHeader>{menuItem.title}</CardHeader>
                </Card>
              </Link>
            ))}
          </AccordionItem>
          <AccordionItem
            key="5"
            aria-label="Accordion 5"
            title={headerPOINT.buttonTitle}
          >
            {headerPOINT.menuItems.map((menuItem) => (
              <Link key={menuItem.title} href={menuItem.href}>
                <Card
                  className="m-2 dark:bg-gray-dark"
                  key={menuItem.title}
                  onClick={() => router.push(menuItem.href)}
                >
                  <CardHeader>{menuItem.title}</CardHeader>
                </Card>
              </Link>
            ))}
          </AccordionItem>
        </Accordion>
      </NavbarMenu>
    </Navbar>
  );
}
