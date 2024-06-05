import { Card, Link, Spinner, User } from "@nextui-org/react";
import { CardFooter, Link as MyLink, Avatar } from "@nextui-org/react";
import { User as MyUser } from "../../types/types";
import { formatDate } from "@/utils/dateUtils";

type ProfileCardProps = {
  userData: any;
};

export default function ProfileCard({ userData }: ProfileCardProps) {
  if (!userData) {
    // user 데이터가 없을 경우 로딩 컴포넌트 표시
    return <Spinner size="lg" />;
  }
  // console.log(user);
  return (
    <>
      <Card
        className="hidden md:block m-8 relative w-full overflow-visible"
        style={{ paddingTop: "30px" }}
      >
        <div className="flex items-start p-4">
          {/* Avatar 위치를 조정합니다. */}
          <Avatar
            src={userData.avatar}
            className="w-28 h-28 text-large absolute top-4 left-16"
          />
          <div className="ml-48">
            <p className="font-bold text-4xl">{userData.nickname}</p>
            <Link
              href={`/user/profile/${userData.email}`}
              className="font-bold text-xl text-blue-400"
            >
              @{userData.name}
            </Link>
          </div>
        </div>
        <Card
          className="flex-1 p-4 m-4 ml-8 overflow-hidden"
          style={{ maxWidth: "400px", overflowWrap: "break-word" }}
        >
          {userData.message}
        </Card>
        <p className="ml-6 mb-4 font-bold text-sm">
          가입일 : {formatDate(userData.createdAt)}
        </p>
      </Card>
      <Card className="block md:hidden m-8 w-full flex items-center">
        <User
          name={userData.nickname}
          description={userData.role}
          avatarProps={{
            src: userData.avatar,
          }}
          className="mt-4"
        />
        <Card
          className="flex-1 p-4 m-4  overflow-hidden"
          style={{ maxWidth: "400px", overflowWrap: "break-word" }}
        >
          옴게메게페고십다
        </Card>
        <p className=" mb-4 font-bold text-sm">가입일 : 2021.04.12</p>
      </Card>
    </>
  );
}
