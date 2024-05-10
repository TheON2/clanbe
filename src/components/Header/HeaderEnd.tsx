import { Button, Link, NavbarContent, NavbarItem } from "@nextui-org/react";
import { ThemeSwitcher } from "../ThemeSwitcher";

export const HeaderEnd = () => {
  const handleSubmit = async (event: any) => {
    event.preventDefault(); // Link 컴포넌트의 기본 행동을 중단합니다.

    try {
      const response = await fetch("/api/users/dummy", {
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
  return (
    <NavbarContent justify="end">
      {/* <NavbarItem className="hidden lg:flex">
        <Link href="#">Login</Link>
      </NavbarItem>
      <NavbarItem>
        <Button as={Link} color="primary" href="#" variant="flat">
          Sign Up
        </Button>
      </NavbarItem> */}
      <NavbarItem>
        <Button color="primary" href="#" variant="flat" onClick={handleSubmit}>
          Dummy
        </Button>
      </NavbarItem>
    </NavbarContent>
  );
};
