import { Post } from "@/service/posts";
import Image from "next/image";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";

function formatDate(date: Date) {
  const options: Intl.DateTimeFormatOptions = {
    year: "2-digit", // 'numeric' 또는 '2-digit' 중 하나를 사용
    month: "2-digit", // 'long', 'short', 'narrow', 'numeric', '2-digit' 중 하나를 사용
    day: "2-digit", // 'numeric' 또는 '2-digit' 중 하나를 사용
    hour: "2-digit", // 'numeric' 또는 '2-digit' 중 하나를 사용
    minute: "2-digit", // 'numeric' 또는 '2-digit' 중 하나를 사용
    hour12: true,
    timeZone: "Asia/Seoul",
  };

  return new Intl.DateTimeFormat("ko-KR", options).format(new Date(date));
}

type Props = { post: Post };
export default function PostCard({
  post: { title, description, createdAt, category, thumbnail, fileUrl, _id },
}: Props) {
  function formatRelativeDate(date: Date) {
    const now = new Date();
    const postDate = new Date(date);
    const diffInSeconds = Math.floor(
      (now.getTime() - postDate.getTime()) / 1000
    );
    const diffInHours = Math.floor(diffInSeconds / 3600);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 24) {
      return `${diffInHours}시간 전`;
    } else {
      return `${diffInDays}일 전`;
    }
  }
  const isMobile = useMediaQuery({ maxWidth: 767 });
  // 현재 게시물 렌더링
  const getFormattedDate = (date: Date) => {
    return isMobile ? formatRelativeDate(date) : formatDate(date);
  };
  return (
    <a href={`/posts/${_id}`}>
      <article className="rounded-md overflow-hidden shadow-md hover:shadow-xl">
        <Image
          className="w-full"
          src={thumbnail}
          alt={title}
          width={300}
          height={200}
        />
        <div className="flex flex-col items-center p-4">
          <time className=" text-gray-700">{getFormattedDate(createdAt)}</time>
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="w-full truncate text-center">{description}</p>
          <span className="text-sm rounded-lg bg-green-100 px-2 my-2">
            {category}
          </span>
        </div>
      </article>
    </a>
  );
}
