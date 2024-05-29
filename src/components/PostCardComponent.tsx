import React from "react";
import { Avatar, Button, Chip, Divider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { categoryLabels } from "../../public/data";

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

  const getCategoryPath = (category: string) => {
    switch (category) {
      case "공지사항":
        return "/clanbe/notices";
      case "클랜 후원":
        return "/clanbe/support";
      case "자유게시판":
        return "/community/forum";
      case "가입인사":
        return "/community/introduce";
      case "건의사항":
        return "/community/feedback";
      case "전략전술":
        return "/community/tactics";
      case "출석체크":
        return "/community/dailycheckin";
      case "랭킹전":
        return "/league/ranking";
      case "이벤트":
        return "/league/event";
      case "외부리그":
        return "/league/opponent";
      case "끝장전":
        return "/league/versus";
      case "프로리그":
        return "/proleague/notice";
      default:
        return "/"; // 기본 경로
    }
  };
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
            router.push(`${path}`);
          }}
        >
          {labels[category]}
        </Button>
        <div
          className="font-bold md:text-xl text-sm hover:text-blue-default cursor-pointer"
          onClick={() => {
            router.push(`/post/read/${id}/${category}`);
          }}
        >
          {title}
        </div>
      </div>
      <div className="flex flex-row items-center gap-2 mx-4">
        <div className="flex items-center gap-4">
          <Avatar size="sm" isBordered color="success" src={authorAvatar} />
          <span>{authorNickName}</span>
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
