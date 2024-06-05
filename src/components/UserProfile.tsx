import { useState, useEffect } from "react";
import { Button, Card, CardBody, User, Link } from "@nextui-org/react";
import { User as MyUser } from "next-auth";

const UserProfile = ({ email }: { email: string | null | undefined }) => {
  const [user, setUser] = useState<MyUser>();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        setUser(userData.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (email) {
      fetchUserData();
    }
  }, [email]);

  if (!user) {
    return <div>Loading...</div>; // 유저 데이터가 없을 경우 로딩 표시
  }

  return (
    <div className="flex items-center pl-4 pt-4">
      <User
        name={user.nickname || "Unknown User"}
        description={
          <Link href={`/user/profile/${user.email}`} size="sm">
            @{user.name || "not available"}
          </Link>
        }
        avatarProps={{
          src: user.avatar || "https://via.placeholder.com/150",
        }}
      />
    </div>
  );
};

export default UserProfile;
