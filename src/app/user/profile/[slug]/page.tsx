import ProfileComponent from "@/components/ProfileComponent/ProfileComponent";
import { getUser } from "./actions";

type Props = {
  params: {
    slug: string;
  };
};

export default async function ProfilePage({ params: { slug } }: Props) {
  const { user } = await getUser(slug);
  console.log(user);
  return <ProfileComponent user={user} />;
}
