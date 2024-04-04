"use client";

import {
  Accordion,
  AccordionItem,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";

import {
  ChevronDown,
  Lock,
  Activity,
  Flash,
  Server,
  TagUser,
  Scale,
} from "../../public/Icons";
import { useState } from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { HeaderLogo } from "./Header/HeaderLogo";
import { HeaderDropdown } from "./Header/HeaderDropdown";
import {
  headerDummy,
  headerCLANBE,
  headerCOMMUNITY,
  headerBELO,
  headerLEAGUE,
  headerPOINT,
} from "../../public/data";

export default function Header() {
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

  const handleSubmit = async (event: any) => {
    event.preventDefault(); // Link 컴포넌트의 기본 행동을 중단합니다.

    try {
      const response = await fetch("/api/dummy", {
        method: "POST",
        // body와 headers를 생략할 수 있습니다, 서버에서 더미 데이터를 처리하기 때문입니다.
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Failed to submit the article:", error);
    }
  };

  const icons = {
    chevron: (
      <ChevronDown fill="currentColor" size={16} height={15} width={15} />
    ),
    scale: <Scale fill="currentColor" size={30} height={15} width={15} />,
    lock: <Lock fill="currentColor" size={30} height={15} width={15} />,
    activity: <Activity fill="currentColor" size={30} height={15} width={15} />,
    flash: <Flash fill="currentColor" size={30} height={15} width={15} />,
    server: <Server fill="currentColor" size={30} height={15} width={15} />,
    user: <TagUser fill="currentColor" size={30} height={15} width={15} />,
  };

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
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        {/* <NavbarItem>
          <Button
            color="primary"
            href="#"
            variant="flat"
            onClick={handleSubmit}
          >
            Dummy
          </Button>
        </NavbarItem> */}
      </NavbarContent>
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
              className="w-full"
              href="#"
            >
              <Accordion
                motionProps={{
                  variants: {
                    enter: {
                      y: 0,
                      opacity: 1,
                      height: "auto",
                      transition: {
                        height: {
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                          duration: 1,
                        },
                        opacity: {
                          easings: "ease",
                          duration: 1,
                        },
                      },
                    },
                    exit: {
                      y: -10,
                      opacity: 0,
                      height: 0,
                      transition: {
                        height: {
                          easings: "ease",
                          duration: 0.25,
                        },
                        opacity: {
                          easings: "ease",
                          duration: 0.3,
                        },
                      },
                    },
                  },
                }}
              >
                <AccordionItem
                  key="1"
                  aria-label="Accordion 1"
                  title="Accordion 1"
                >
                  {item}
                </AccordionItem>
                <AccordionItem
                  key="2"
                  aria-label="Accordion 2"
                  title="Accordion 2"
                >
                  {item}
                </AccordionItem>
                <AccordionItem
                  key="3"
                  aria-label="Accordion 3"
                  title="Accordion 3"
                >
                  {item}
                </AccordionItem>
              </Accordion>
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
