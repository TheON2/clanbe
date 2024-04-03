import {
  Button,
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
} from "@nextui-org/react";

import { DropdownMenuLink } from "./DropdownMenuLink";
import { ChevronDown } from "../../../public/Icons";

type MenuItem = {
  title: string;
  description: string;
  icon: JSX.Element;
};

type NavbarDropdownProps = {
  buttonTitle: string;
  menuItems: MenuItem[];
};

export const NavbarDropdown: React.FC<NavbarDropdownProps> = ({
  buttonTitle,
  menuItems,
}) => (
  <Dropdown>
    <NavbarItem>
      <DropdownTrigger>
        <Button
          disableRipple
          className="p-0 bg-transparent data-[hover=true]:bg-transparent"
          endContent={
            <ChevronDown fill="currentColor" size={16} height={15} width={15} />
          }
          radius="sm"
          variant="light"
        >
          {buttonTitle}
        </Button>
      </DropdownTrigger>
    </NavbarItem>
    <DropdownMenu
      aria-label={`${buttonTitle} features`}
      className="w-[250px]"
      itemClasses={{
        base: "gap-4",
      }}
    >
      {menuItems.map(({ title, description, icon }) => (
        <DropdownMenuLink
          key={title}
          title={title}
          description={description}
          icon={icon}
        />
      ))}
    </DropdownMenu>
  </Dropdown>
);
