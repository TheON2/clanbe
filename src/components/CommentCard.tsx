import { Card, User } from "@nextui-org/react";
import { CardFooter, Link as MyLink } from "@nextui-org/react";

export default function CommentCard() {
  return (
    <Card className="m-4 flex flex-nowrap max-w-[700px]">
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
      <Card
        className="flex-1 p-2 m-2 overflow-hidden"
        style={{ maxWidth: "700px", overflowWrap: "break-word" }}
      >
        asdfasfasdfasdfasdfasdfasdfsadfasdasdasdasdasdfasfasdfasdfasdfasdfasdfsadfasdasdasdasdasdfasfasdfasdfasdfasdfasdfsadfasdasdasdasdasdfasfasdfasdfasdfasdfasdfsadfasdasdasdasd
      </Card>
    </Card>
  );
}
