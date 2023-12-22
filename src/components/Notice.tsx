import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

const Notice = () => {
  return (
    <Card className="w-[540px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">NextUI</p>
          <p className="text-small text-default-500">nextui.org</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="flex gap-4 my-2">
          <Button
            className="h-[30px]"
            radius="full"
            color="primary"
            variant="ghost"
          >
            Ghost
          </Button>
          <p> 12/18 후원통장내역</p>
          <p className="ml-auto"> Classic 12.10.</p>
        </div>
        <div className="flex gap-4 my-2">
          <Button
            className="h-[30px]"
            radius="full"
            color="primary"
            variant="ghost"
          >
            Ghost
          </Button>
          <p> 12/18 후원통장내역</p>
          <p className="ml-auto"> Classic 12.10.</p>
        </div>
        <div className="flex gap-4 my-2">
          <Button
            className="h-[30px]"
            radius="full"
            color="primary"
            variant="ghost"
          >
            Ghost
          </Button>
          <p> 12/18 후원통장내역</p>
          <p className="ml-auto"> Classic 12.10.</p>
        </div>

        <div className="flex gap-4 my-2">
          <Button
            className="h-[30px]"
            radius="full"
            color="primary"
            variant="ghost"
          >
            Ghost
          </Button>
          <p> 12/18 후원통장내역</p>
          <p className="ml-auto"> Classic 12.10.</p>
        </div>
        <div className="flex gap-4 my-2">
          <Button
            className="h-[30px]"
            radius="full"
            color="primary"
            variant="ghost"
          >
            Ghost
          </Button>
          <p> 12/18 후원통장내역</p>
          <p className="ml-auto"> Classic 12.10.</p>
        </div>
      </CardBody>
    </Card>
  );
};

export default Notice;
