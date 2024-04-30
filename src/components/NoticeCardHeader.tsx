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
        return "/CLANBE/notices";
      case "클랜 후원":
        return "/CLANBE/support";
      case "자유게시판":
        return "/COMMUNITY/forum";
      case "가입인사":
        return "/COMMUNITY/introduce";
      case "건의사항":
        return "/COMMUNITY/feedback";
      case "전략전술":
        return "/COMMUNITY/tactics";
      case "출석체크":
        return "/COMMUNITY/dailycheckin";
      case "랭킹전":
        return "/LEAGUE/ranking";
      case "이벤트":
        return "/LEAGUE/event";
      case "외부리그":
        return "/LEAGUE/opponent";
      case "끝장전":
        return "/LEAGUE/versus";
      default:
        return "/"; // 기본 경로
    }
  };

  return (
    <>
      <CardHeader
        className="flex justify-between items-center px-4 py-2"
        onClick={() => {
          router.push(`/post/read/${announce._id}/${announce.category}`);
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
