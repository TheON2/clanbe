import React from "react";
import { CardHeader, Divider } from "@nextui-org/react";

interface NoticeCardHeaderProps {
  title: string;
  date: string;
}

const NoticeCardHeader: React.FC<NoticeCardHeaderProps> = ({ title, date }) => {
  return (
    <>
      <CardHeader className="flex justify-between items-center px-4 py-2">
        <div className="w-full sm:w-1/12 text-center">공지</div>
        <div className="w-full sm:w-7/12 text-center">{title}</div>
        <div className="w-full sm:w-1/12 text-center">{date}</div>
      </CardHeader>
      <Divider />
    </>
  );
};

export default NoticeCardHeader;
