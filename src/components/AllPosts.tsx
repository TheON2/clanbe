import { announce, board } from "../../public/data";
import BoardLayout from "./BoardLayout";

const AllPosts = () => {
  return (
    <BoardLayout boardTitle={"전체 게시글"} announce={announce} posts={board} />
  );
};

export default AllPosts;
