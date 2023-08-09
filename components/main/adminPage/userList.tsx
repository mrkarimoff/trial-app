import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/redux/globalReducer";
import { useState, useEffect } from "react";
import { Loader } from "../loader";

const UserList = () => {
  const [users, setUsers] = useState<Array<User>>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getUsers();
  }, []);

  async function getUsers() {
    const data: User[] = await fetch(process.env.NEXT_PUBLIC_DOMAIN + "/api/admin").then(
      async (res) => await res.json()
    );
    setUsers(data);
    setIsLoading(false);
  }

  return isLoading ? (
    <Loader />
  ) : (
    <Table className="mt-3">
      <TableHeader>
        <TableRow>
          <TableHead>No:</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map((user, index) => (
          <TableRow>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <img width={40} src={user.image} alt={user.name} />
            </TableCell>
            <TableCell className="text-red-400 font-semibold">{user.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserList;
