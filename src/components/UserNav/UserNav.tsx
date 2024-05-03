import { Team } from "../../../types/types";
import { User as MyUser } from "next-auth";
import UserTab from "./UserTab";
import MobileUserTab from "./MobileUserTab";

type UserNavProps = {
  user: MyUser;
  teams: Team[];
  users: MyUser[];
};

const UserNav = ({ user, teams, users }: UserNavProps) => {
  return (
    <>
      <div className="hidden md:block">
        <UserTab user={user} teams={teams} users={users} />
      </div>
      <div className="block md:hidden">
        <MobileUserTab user={user} teams={teams} users={users} />
      </div>
    </>
  );
};

export default UserNav;
