import React from "react";
import { Avatar, Chip, Divider } from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface PostCardComponentProps {
  id: string;
  title: string;
  author: string;
  views: number;
  date: string;
  category: string;
}

type CategoryLabels = {
  [key: string]: string; // 모든 문자열 키는 문자열 값을 가집니다.
};

const PostCardComponent: React.FC<PostCardComponentProps> = ({
  id,
  title,
  author,
  views,
  date,
  category,
}) => {
  const categoryLabels: CategoryLabels = {
    forum: "자유게시판",
    support: "클랜 후원",
    introduce: "가입인사",
    feedback: "건의사항",
    tactics: "전략전술",
    dailycheckin: "출석체크",
    ranking: "랭킹전",
    event: "이벤트",
    opponent: "외부리그",
    versus: "끝장전",
    notice: "공지사항",
  };
  const router = useRouter();
  return (
    <div
      className="flex flex-col px-4 py-2 gap-4"
      onClick={() => {
        router.push(`/post/read/${id}/${category}`);
      }}
    >
      <div className="flex gap-4">
        <div className="font-bold text-xl">{title}</div>
        <div>
          <Chip>{categoryLabels[category]}</Chip>
        </div>
      </div>
      <div className="flex flex-row items-center gap-2 mx-4">
        <div className="flex items-center gap-4">
          <Avatar
            size="sm"
            isBordered
            color="success"
            src="https://i.pravatar.cc/150?u=a04258114e29026302d"
          />
          <span>{author}</span>
        </div>
        {/* 간격을 최소화하면서 조회수와 날짜를 옆으로 배치 */}
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
