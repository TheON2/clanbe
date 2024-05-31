"use client";

import { useState } from "react";
import { Button } from "@nextui-org/react";
import TeamPage from "./TeamPage";
import AdminPage from "./AdminPage";
import { useSession } from "next-auth/react";

interface TeamComponentProps {
  teams: any;
  users: any;
}

const TeamComponent: React.FC<TeamComponentProps> = ({ teams, users }) => {
  const [isSelected, setIsSelected] = useState(false);
  const { data: session, status } = useSession();

  return (
    <div className="w-full">
      <div className="m-2">
        {session && session.user && session.user.grade >= 4 && (
          <>
            {!isSelected ? (
              <Button
                color="primary"
                onClick={() => {
                  setIsSelected(true);
                }}
              >
                관리자 페이지
              </Button>
            ) : (
              <Button
                color="primary"
                onClick={() => {
                  setIsSelected(false);
                }}
              >
                일반 페이지
              </Button>
            )}
          </>
        )}
      </div>
      {!isSelected ? (
        <TeamPage teams={teams} users={users} />
      ) : (
        <AdminPage teams={teams} users={users} />
      )}
    </div>
  );
};

export default TeamComponent;
