import ProfileComponent from "@/components/ProfileComponent";
import { getUserProfile } from "@/service/user";

type Props = {
  params: {
    slug: string;
  };
};

export default async function ProfilePage({ params: { slug } }: Props) {
  const { user, posts, comments } = await getUserProfile(slug);
  return <ProfileComponent user={user} posts={posts} comments={comments} />;
}
