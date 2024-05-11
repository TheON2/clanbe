"use server";

import { Divider } from "@nextui-org/react";
import Banner from "@/components/Banner";
import Notice from "@/components/Notice";
import Upcoming from "@/components/Upcoming";
import PublicPosts from "@/components/PublicPosts";
import SupportPost from "@/components/SupportPost";
import MobileUserComponent from "@/components/MobileUserComponent";
import { getNavData } from "@/service/user";
import { getAllPosts, PostData } from "@/service/posts";
import { getSupports } from "@/service/supports";
import { getEvent } from "@/service/schedule";
import { Post } from "../../types/types";

export default async function HomePage() {
  // const { teams, users } = await getNavData();
  // const posts = await getAllPosts();
  // const { events } = await getEvent();
  // const { supports, allSupports } = await getSupports();

  // const allPosts = posts.sort(
  //   (a: Post, b: Post) =>
  //     new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  // );

  // const filteredNotices = posts
  //   .filter((post: Post) => post.noticed)
  //   .slice(0, 6);

  return (
    <div className="mx-auto">
      <Banner />
      <Divider className="my-4" />
      {/* <div className="flex flex-wrap gap-2 justify-center">
        <div className="block md:hidden w-full mx-4">
          <MobileUserComponent teams={teams} users={users} />
        </div>
        <Notice notices={filteredNotices} />
        <Upcoming events={events} />
        <PublicPosts posts={allPosts} />
        <SupportPost supports={supports} allSupports={allSupports} />
      </div> */}
    </div>
  );
}
