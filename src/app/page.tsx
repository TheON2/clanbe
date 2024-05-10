import { Divider } from "@nextui-org/react";
import Banner from "@/components/Banner";
import Notice from "@/components/Notice";
import Upcoming from "@/components/Upcoming";
import PublicPosts from "@/components/PublicPosts";
import SupportPost from "@/components/SupportPost";
import MobileUserComponent from "@/components/MobileUserComponent";

export default function HomePage() {
  return (
    <div className="mx-auto">
      <Banner />
      <Divider className="my-4" />
      <div className="flex flex-wrap gap-2 justify-center">
        <div className="block md:hidden w-full mx-4">
          <MobileUserComponent />
        </div>
        <Notice />
        <Upcoming />
        <PublicPosts />
        <SupportPost />
      </div>
    </div>
  );
}
