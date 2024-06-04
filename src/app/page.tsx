"use server";

import { Divider } from "@nextui-org/react";
import Banner from "@/components/Banner";
import Notice from "@/components/Notice";
import Upcoming from "@/components/Upcoming";
import PublicPosts from "@/components/PublicPosts";
import SupportPost from "@/components/SupportPost";
const MobileUserComponent = React.lazy(
  () => import("@/components/MobileUserComponent")
);
import { getNavData } from "@/service/user";
import { getPosts } from "@/service/posts";
import { getSupports } from "@/service/supports";
import { getEvent } from "@/service/schedule";
import { Post } from "../../types/types";
import { getPointData } from "@/service/point";
import React, { Suspense } from "react";
import BroadCastComponent from "@/components/BroadCastComponent";

export default async function HomePage() {
  const { teams, users } = await getNavData();
  const { points } = await getPointData();
  const { data } = await getPosts("main");
  const { events } = await getEvent();
  const { supports, allSupports } = await getSupports();

  const allPosts = data.sort(
    (a: Post, b: Post) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const filteredNotices = data.filter((post: Post) => post.noticed).slice(0, 6);
  const filteredVod = data
    .filter((post: Post) => post.category === "vod")
    .slice(0, 6);

  return (
    <div className="mx-auto">
      <div className="flex flex-wrap gap-2 justify-center">
        <Banner />
        <div className="block md:hidden w-full mx-4">
          <Suspense fallback={<div>Loading...</div>}>
            <MobileUserComponent teams={teams} users={users} points={points} />
          </Suspense>
        </div>
        <BroadCastComponent posts={filteredVod} />
        <Divider className="my-4" />
        <Notice notices={filteredNotices} />
        <Upcoming events={events} />
        <PublicPosts posts={allPosts} />
        <SupportPost supports={supports} allSupports={allSupports} />
      </div>
    </div>
  );
}
