import { User } from "next-auth";
import React from "react";

interface PointRankingProps {
  users: User[];
}

const PointRanking: React.FC<PointRankingProps> = ({ users }) => {
  // Implement the component logic here

  return <div>{/* Render the component content here */}</div>;
};

export default PointRanking;
