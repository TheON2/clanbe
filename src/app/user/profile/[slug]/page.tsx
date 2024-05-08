import ProfileComponent from "@/components/ProfileComponent/ProfileComponent";
import { getUser } from "./actions";

type Props = {
  params: {
    slug: string;
  };
};

export default async function ProfilePage({ params: { slug } }: Props) {
  const { user, posts, comments } = await getUser(slug);
  return <ProfileComponent user={user} posts={posts} comments={comments} />;
}
