"use client";

import { useCallback, useMemo, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  User as UiUser,
  Tabs,
  Tab,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import SubmitModal from "../SubmitModal";
import AdminUserTab from "./AdminUserTab";
import AdminPointTab from "./AdminPointTab";
import AdminPostTab from "./AdminPostTab";

export default function AdminComponent({ teams, users, points, posts }: any) {
  const router = useRouter();

  const [modalMessage, setModalMessage] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const { data: session, status } = useSession();

  if (
    status !== "loading" &&
    session &&
    session.user &&
    session.user.grade !== undefined &&
    session.user.grade < 4
  ) {
    return null;
  }

  return (
    <>
      <div className="md:w-2/3 w-full mx-auto">
        <SubmitModal
          title={"알림"}
          text={modalMessage}
          isOpen={isSubmit}
          onClose={() => setIsSubmit(false)}
        />
        <p className="font-bold text-3xl">어드민 페이지</p>
        <div>
          <Card>
            <CardBody>
              <Tabs aria-label="tabs">
                <Tab key={"user"} title="유저" aria-label="usertab">
                  <AdminUserTab
                    users={users}
                    setModalMessage={setModalMessage}
                    setIsSubmit={setIsSubmit}
                  />
                </Tab>
                <Tab key={"point"} title="포인트">
                  <AdminPointTab points={points} />
                </Tab>
                <Tab key={"post"} title="게시물">
                  <AdminPostTab posts={posts} />
                </Tab>
              </Tabs>
            </CardBody>
            <CardFooter></CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
