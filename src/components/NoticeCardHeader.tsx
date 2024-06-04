import React from "react";
import { Button, CardHeader, Chip, Divider } from "@nextui-org/react";
import { categoryLabels, getCategoryPath } from "../../public/data";
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
