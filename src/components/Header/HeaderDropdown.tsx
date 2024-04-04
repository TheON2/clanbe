import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

import { headerIcon } from "./HeaderIcon";

type MenuItem = {
  title: string;
  description: string;
  icon: string;
};

type HeaderDropdownProps = {
  buttonTitle?: string;
  menuItems: MenuItem[];
};

export const HeaderDropdown: React.FC<HeaderDropdownProps> = ({
  buttonTitle,
  menuItems,
}) => (
  <NavbarContent className="hidden sm:flex gap-4" justify="center">
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Button
            disableRipple
            className="p-0 bg-transparent data-[hover=true]:bg-transparent"
            endContent={headerIcon.chevron}
            radius="sm"
            variant="light"
          >
            {buttonTitle}
          </Button>
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label="ACME features"
        className="w-[250px]"
        itemClasses={{
          base: "gap-4",
        }}
      >
        {menuItems?.map((menuItem) => (
          <DropdownItem
            key={menuItem.title}
            description={menuItem.description}
            startContent={headerIcon[menuItem.icon]}
          >
            {menuItem.title}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  </NavbarContent>
);
