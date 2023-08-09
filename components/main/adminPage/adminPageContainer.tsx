"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RootState, store } from "@/redux/store";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";
import JsonsList from "./jsonsList";
import UserList from "./userList";

const AdminPageContainer = () => {
  const user = useSelector((state: RootState) => state.global.user);
  const [role, setRole] = useState("");

  useEffect(() => {
    if (user) setRole(user.role);
  }, [user]);

  useEffect(() => {
    if (role && role !== "admin") return redirect("/denied");
  }, [role]);

  return (
    <div className="container flex flex-col items-center gap-4">
      <h1>Admin Page</h1>
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger className="w-[200px]" value="users">
            User List
          </TabsTrigger>
          <TabsTrigger className="w-[200px]" value="jsons">
            JSON List
          </TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <UserList />
        </TabsContent>
        <TabsContent value="jsons">
          <JsonsList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const AdminPageWithProvider = () => {
  return (
    <Provider store={store}>
      <AdminPageContainer />
    </Provider>
  );
};

export default AdminPageWithProvider;
