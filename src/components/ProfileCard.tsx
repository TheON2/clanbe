import { Card, User } from "@nextui-org/react";
import { CardFooter, Link as MyLink, Avatar } from "@nextui-org/react";

export default function CommentCard() {
  return (
    <>
      <Card
        className="hidden md:block m-8 relative w-full overflow-visible"
        style={{ paddingTop: "30px" }}
      >
        <div className="flex items-start p-4">
          {/* Avatar 위치를 조정합니다. */}
          <Avatar
            src="https://i.pravatar.cc/150?u=a04258114e29026302d"
            className="w-25 h-25 text-large absolute -top-10 left-12"
          />
          <div className="ml-48">
            <p className="font-bold text-4xl">PLUGPOWER</p>
            <p className="font-bold text-xl text-blue">@김도원</p>
          </div>
        </div>
        <Card
          className="flex-1 p-4 m-4 ml-8 overflow-hidden"
          style={{ maxWidth: "400px", overflowWrap: "break-word" }}
        >
          옴게메게페고십다
        </Card>
        <p className="ml-6 mb-4 font-bold text-sm">가입일 : 2021.04.12</p>
      </Card>
      <Card className="block md:hidden m-8 w-full flex items-center">
        <User
          name="Jane Doe"
          description="Product Designer"
          avatarProps={{
            src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
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
