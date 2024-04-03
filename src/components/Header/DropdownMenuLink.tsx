import { DropdownItem } from "@nextui-org/react";

type DropdownMenuLinkProps = {
  title: string;
  description: string;
  icon: JSX.Element;
};

export const DropdownMenuLink: React.FC<DropdownMenuLinkProps> = ({
  title,
  description,
  icon,
}) => (
  <DropdownItem key={title} description={description} startContent={icon}>
    {title}
  </DropdownItem>
);
