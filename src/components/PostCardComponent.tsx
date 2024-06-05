import React from "react";
import { Avatar, Button, Chip, Divider, Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { categoryLabels, getCategoryPath } from "../../public/data";

interface PostCardComponentProps {
  id: string;
  title: string;
  author: string;
  authorNickName: string;
  authorAvatar: string;
  views: number;
  date: string;
  category: string;
}

const PostCardComponent: React.FC<PostCardComponentProps> = ({
  id,
  title,
  author,
  views,
  date,
  category,
  authorAvatar,
  authorNickName,
}) => {
  const labels = categoryLabels;
  const router = useRouter();
  return (
    <div className="flex flex-col px-4 py-2 gap-4">
      <div className="flex gap-4">
        <Button
          className="h-[30px]"
          radius="full"
          color="primary"
          variant="ghost"
          onClick={() => {
            const path = getCategoryPath(categoryLabels[category]);
            window.location.href = `${path}`;
          }}
        >
          {labels[category]}
        </Button>
        <div
          className="font-bold md:text-xl text-sm hover:text-blue-default cursor-pointer"
          onClick={() => {
            window.location.href = `/post/read/${id}/${category}`;
          }}
        >
          {title}
        </div>
      </div>
      <div className="flex flex-row items-center gap-2 mx-4">
        <div className="flex items-center gap-4">
          <Avatar size="sm" isBordered color="success" src={authorAvatar} />
          <Link
            href={`/user/profile/${author}`}
            className="font-bold text-xl text-default-500 hover:text-blue-default cursor-pointer"
          >
            {authorNickName}
          </Link>
        </div>
        <div className="flex-none ml-auto mr-2" style={{ width: "auto" }}>
          조회 수 {views}
        </div>
        <div className="flex-none" style={{ width: "auto" }}>
          {date}
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default PostCardComponent;
