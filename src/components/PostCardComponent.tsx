import React from "react";
import { Avatar, Divider } from "@nextui-org/react";

interface PostCardComponentProps {
  title: string;
  author: string;
  views: number;
  date: number;
}

const PostCardComponent: React.FC<PostCardComponentProps> = ({
  title,
  author,
  views,
  date,
}) => {
  const formatDate = (date: number): string => {
    const dateString = date.toString().padStart(6, "0"); // 날짜를 6자리 문자열로 변환
    return `${dateString.slice(0, 2)}.${dateString.slice(
      2,
      4
    )}.${dateString.slice(4)}`;
  };

  return (
    <div className="flex flex-col px-4 py-2 gap-4">
      <div className="font-bold text-xl">{title}</div>
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
          {formatDate(date)}
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default PostCardComponent;
