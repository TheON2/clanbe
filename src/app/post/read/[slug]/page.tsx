import PostForm from "@/components/PostForm";
import { getPostData } from "@/service/posts";

type Props = {
  params: {
    slug: string;
  };
};

export default async function PostPage({ params: { slug } }: Props) {
  const post = await getPostData(slug);
  const { title, category, fileUrl, next, prev, postId } = post;
  return <PostForm post={post} />;
}
