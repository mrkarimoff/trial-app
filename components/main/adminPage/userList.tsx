import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@/redux/globalReducer";
import { useState, useEffect } from "react";
import { Loader } from "../loader";

const UserList = ({ UiTranlations }: { UiTranlations: any }) => {
  const { toast } = useToast();
  const [users, setUsers] = useState<Array<User>>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    setIsLoading(true);
    try {
      const data = await fetch(process.env.NEXT_PUBLIC_DOMAIN + "/api/admin").then(
        async (res) => await res.json()
      );

      if (data?.message) throw new Error();
      setUsers(data);
    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", title: UiTranlations.errMsg });
    }
    setIsLoading(false);
  }

  return isLoading ? (
    <Loader />
  ) : (
    <Table className="mt-3">
      <TableHeader>
        <TableRow>
          <TableHead>{UiTranlations.noColumn}</TableHead>
          <TableHead>{UiTranlations.nameColumn}</TableHead>
          <TableHead>{UiTranlations.emailColumn}</TableHead>
          <TableHead>{UiTranlations.imageColumn}</TableHead>
          <TableHead>{UiTranlations.roleColumn}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map((user, index) => (
          <TableRow key={user.id}>
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
