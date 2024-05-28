"use client";

import { Button, Card, CardBody } from "@nextui-org/react";
import Link from "next/link";

const NotLoggedUserNav = () => {
  return (
    <Card className="mb-4">
      <CardBody>
        <div className="flex flex-col justify-center gap-4">
          <Link href="/auth/signin" passHref>
            <Button color="primary" className="w-full">
              로그인
            </Button>
          </Link>
          <Link href="/auth/signup" passHref>
            <Button color="primary" className="w-full">
              회원가입
            </Button>
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};

export default NotLoggedUserNav;
