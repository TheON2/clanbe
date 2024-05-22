import { formatDateOnly } from "@/utils/dateUtils";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

function PostTable({ data }: { data: any[] }) {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>SEND</TableColumn>
        <TableColumn>RECEIVE</TableColumn>
        <TableColumn>POINT</TableColumn>
        <TableColumn>MESSAGE</TableColumn>
        <TableColumn>CREATED AT</TableColumn>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item._id}>
            <TableCell>{item.senduser}</TableCell>
            <TableCell>{item.receiveuser}</TableCell>
            <TableCell>{item.point}</TableCell>
            <TableCell>{item.message}</TableCell>
            <TableCell>{formatDateOnly(item.createdAt)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const AdminPostTab = ({ posts }: any) => {
  return (
    <div>
      <Card>
        <PostTable data={posts} />
      </Card>
    </div>
  );
};

export default AdminPostTab;
