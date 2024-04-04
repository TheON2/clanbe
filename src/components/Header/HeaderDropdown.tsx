import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
} from "@nextui-org/react";

import { headerIcon } from "./HeaderIcon";
import { useRouter } from "next/navigation";

type MenuItem = {
  title: string;
  description: string;
  icon: string;
  href: string;
};

type HeaderDropdownProps = {
  buttonTitle?: string;
  menuItems: MenuItem[];
};

export const HeaderDropdown: React.FC<HeaderDropdownProps> = ({
  buttonTitle,
  menuItems,
}) => {
  const router = useRouter(); // useRouter 훅을 사용하여 라우터 인스턴스를 가져옵니다.

  return (
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
        {menuItems.map((menuItem) => (
          // Link 컴포넌트를 제거하고 onClick 이벤트를 사용합니다.
          <DropdownItem
            key={menuItem.title}
            description={menuItem.description}
            startContent={headerIcon[menuItem.icon]}
            onClick={() => router.push(menuItem.href)} // 클릭 시 해당 href로 이동합니다.
          >
            {menuItem.title}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
