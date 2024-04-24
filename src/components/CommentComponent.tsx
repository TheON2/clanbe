import {
  Button,
  Card,
  Divider,
  Input,
  Textarea,
  User,
} from "@nextui-org/react";
import { CardFooter, Link as MyLink } from "@nextui-org/react";

export default function CommentComponent() {
  return (
    <Card className="p-4 flex flex-nowrap w-full">
      <div className="flex items-center p-4">
        <User
          name="Junior Garcia"
          description={
            <MyLink href="https://twitter.com/jrgarciadev" size="sm" isExternal>
              @jrgarciadev
            </MyLink>
          }
          avatarProps={{
            src: "https://avatars.githubusercontent.com/u/30373425?v=4",
          }}
        />
      </div>
      <div className="flex-1  w-full min-h-[200px]">
        <Textarea minRows={7} maxRows={7}></Textarea>
      </div>
      <div className="flex gap-2">
        {/* 이 부분에 ml-auto를 추가하여 우측 정렬 */}
        <Button color="primary" size="sm" variant="ghost">
          취소
        </Button>
        <Button color="danger" size="sm" variant="ghost">
          등록
        </Button>
      </div>
    </Card>
  );
}
