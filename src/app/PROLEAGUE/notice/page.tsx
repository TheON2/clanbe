import { getPosts } from "@/service/posts";
import BoardLayout from "@/components/BoardLayout";

export default async function Page() {
  const category = "proleaguenotice";
  const posts = await getPosts(category);
  return (
    <BoardLayout
      boardTitle={"프로리그 공지"}
      announce={posts.data}
      posts={posts.data}
      category={category}
    />
  );
}
