import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UploadContainer from "./uploadContainer";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AiFillDelete } from "react-icons/ai";
import { Loader } from "../loader";

interface IJSON {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

const JsonsList = ({ UiTranlations }: { UiTranlations: any }) => {
  const [jsons, setJsons] = useState<Array<IJSON>>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getJsons();
  }, []);

  async function getJsons() {
    const data: IJSON[] = await fetch(process.env.NEXT_PUBLIC_DOMAIN + "/api/jsons").then(
      async (res) => await res.json()
    );
    setJsons(data);
    setIsLoading(false);
  }
  async function deleteJson(id: number) {
    setIsDeleting(true);
    await fetch(process.env.NEXT_PUBLIC_DOMAIN + `/api/jsons/${id}`, { method: "DELETE" });
    getJsons();
    setIsDeleting(false);
  }

  return isLoading ? (
    <Loader />
  ) : (
    <div className="mt-3">
      <UploadContainer UiTranlations={UiTranlations} getJsons={getJsons} />
      <Table className={`mt-3 ${isDeleting && "opacity-50"}`}>
        <TableHeader>
          <TableRow>
            <TableHead>{UiTranlations.noColumn}</TableHead>
            <TableHead>{UiTranlations.nameColumn}</TableHead>
            <TableHead>{UiTranlations.createdColumn}</TableHead>
            <TableHead>{UiTranlations.updatedColumn}</TableHead>
            <TableHead>{UiTranlations.actionColumn}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jsons?.map((json, index) => (
            <TableRow key={json.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{json.name}</TableCell>
              <TableCell>{new Date(json.createdAt).toLocaleString()}</TableCell>
              <TableCell>{new Date(json.updatedAt).toLocaleString()}</TableCell>
              <TableCell>
                <Button disabled={isDeleting} onClick={() => deleteJson(json.id)} variant={"ghost"}>
                  <AiFillDelete className="text-red-500" size={20} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default JsonsList;
