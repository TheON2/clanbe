import React from "react";
import { Button, CardHeader, Chip, Divider } from "@nextui-org/react";
import { categoryLabels } from "../../public/data";
import { useRouter } from "next/navigation";

interface NoticeCardHeaderProps {
  announce: any;
  date: string;
}

const NoticeCardHeader: React.FC<NoticeCardHeaderProps> = ({
  announce,
  date,
}) => {
  const labels = categoryLabels;
  const router = useRouter();

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

  return (
    <>
      <CardHeader
        className="flex justify-between items-center px-4 py-2"
        onClick={() => {
          window.location.href = `/post/read/${announce._id}/${announce.category}`;
        }}
      >
        <div className="w-full sm:w-1/12 text-center">공지</div>
        <div className="w-full sm:w-8/12 text-center">
          {/* <Chip className="m-2 mr-4">{labels[announce.category]}</Chip> */}
          <Button
            className="h-[30px] m-2 mr-4"
            radius="full"
            color="primary"
            variant="ghost"
            onClick={() => {
              const path = getCategoryPath(categoryLabels[announce.category]);
              router.push(`${path}`);
            }}
          >
            {labels[announce.category]}
          </Button>
          {announce.title}
        </div>
        <div className="w-full sm:w-2/12 text-center">{date}</div>
      </CardHeader>
      <Divider />
    </>
  );
};

export default NoticeCardHeader;
