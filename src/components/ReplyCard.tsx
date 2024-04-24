import { Button, ButtonGroup, Card, CardHeader, User } from "@nextui-org/react";
import { CardFooter, Link as MyLink } from "@nextui-org/react";
import { Server } from "../../public/Icons";
import { Image } from "@nextui-org/react";

export default function ReplyCard() {
  return (
    <div className="m-4 ml-24 max-w-[700px] ">
      <Card className="">
        <CardHeader className="justify-between">
          <User
            className=""
            name="Junior Garcia"
            description={
              <MyLink
                href="https://twitter.com/jrgarciadev"
                size="sm"
                isExternal
              >
                @jrgarciadev
              </MyLink>
            }
            avatarProps={{
              src: "https://avatars.githubusercontent.com/u/30373425?v=4",
            }}
          />
          <div className="flex gap-2">
            {/* 이 부분에 ml-auto를 추가하여 우측 정렬 */}
            <Button color="primary" size="sm" variant="ghost">
              수정
            </Button>
            <Button color="danger" size="sm" variant="ghost">
              삭제
            </Button>
          </div>
        </CardHeader>
        <div className="pl-4 text-sm">24.04.22 오후 09:09</div>
        <Card
          className="flex-1 p-2 m-2 overflow-hidden"
          style={{ maxWidth: "700px", overflowWrap: "break-word" }}
        >
          asdfasfasdfasdfasdfasdfasdfsadfasdasdasdasdasdfasfasdfasdfasdfasdfasdfsadfasdasdasdasdasdfasfasdfasdfasdfasdfasdfsadfasdasdasdasdasdfasfasdfasdfasdfasdfasdfsadfasdasdasdasd
        </Card>
      </Card>
    </div>
  );
}
