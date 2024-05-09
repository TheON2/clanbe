import WriteComponent from "@/components/WriteComponent/page";
import { getUserSelect } from "./actions";

export default async function WritePage() {
  const { nicknames } = await getUserSelect();
  return <WriteComponent nicknames={nicknames} />;
}
