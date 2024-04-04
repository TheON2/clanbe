import {
  Activity,
  ChevronDown,
  Flash,
  Scale,
  Server,
  TagUser,
  Lock,
} from "../../../public/Icons";

export const headerIcon: { [key: string]: JSX.Element } = {
  chevron: <ChevronDown fill="currentColor" size={16} height={15} width={15} />,
  scale: <Scale fill="currentColor" size={30} height={15} width={15} />,
  lock: <Lock fill="currentColor" size={30} height={15} width={15} />,
  activity: <Activity fill="currentColor" size={30} height={15} width={15} />,
  flash: <Flash fill="currentColor" size={30} height={15} width={15} />,
  server: <Server fill="currentColor" size={30} height={15} width={15} />,
  user: <TagUser fill="currentColor" size={30} height={15} width={15} />,
};
