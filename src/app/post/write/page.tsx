import WriteComponent from "@/components/WriteComponent";
import { getUserSelect } from "../../../service/posts";

export default async function WritePage() {
  const { nicknames } = await getUserSelect();
  return <WriteComponent nicknames={nicknames} />;
}
