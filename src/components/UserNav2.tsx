"use client";

import { Button, Card, CardBody } from "@nextui-org/react";
import Link from "next/link";

const UserNav2 = () => {
  return (
    <Card className="mb-4">
      <CardBody>
        <div className="flex flex-col justify-center gap-4">
          <Link href="/AUTH/signin" passHref>
            <Button color="primary" className="w-full">
              로그인
            </Button>
          </Link>
          <Link href="/AUTH/signup" passHref>
            <Button color="primary" className="w-full">
              회원가입
            </Button>
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};

export default UserNav2;
