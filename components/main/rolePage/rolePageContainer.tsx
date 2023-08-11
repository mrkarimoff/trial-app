"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { updateUser } from "@/redux/globalReducer";
import { RootState, store } from "@/redux/store";
import { useSession } from "next-auth/react";
import { FaUserCheck, FaUserSecret } from "react-icons/fa";
import { ImUser } from "react-icons/im";
import { Provider, useDispatch, useSelector } from "react-redux";

const RolePageContainer = ({ UiTranslations }: { UiTranslations: any }) => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const user = useSelector((state: RootState) => state.global.user);

  const updateRole = async (role: string) => {
    try {
      const data = await fetch(process.env.NEXT_PUBLIC_DOMAIN + "/api/role", {
        method: "PUT",
        body: JSON.stringify({ role, email: session?.user.email }),
      }).then(async (res) => await res.json());

      if (data?.message) throw new Error();
      dispatch(updateUser(data));
    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", title: UiTranslations.errMsg });
    }
  };

  return (
    <div className="flex justify-center my-20">
      <Card className="w-[400px] mx-2">
        <CardHeader>
          <CardTitle>{UiTranslations.update}</CardTitle>
          <CardDescription>
            {UiTranslations.currentRole}{" "}
            <span className="text-red-400 font-semibold">{user?.role}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <button
              onClick={() => updateRole("participant")}
              disabled={user?.role === "participant"}
              className="social-btn relative mx-auto bg-white dark:bg-slate-700 flex w-[280px] items-center justify-center rounded-lg border-2 border-solid border-[#ECECEC] py-4 pl-4 pr-0 transition-shadow"
            >
              <ImUser className="absolute left-5 text-black dark:text-white" size={22} />
              <span className="text-sm text-black dark:text-white">
                {UiTranslations.changeToParticipant}
              </span>
            </button>
            <button
              onClick={() => updateRole("user")}
              disabled={user?.role === "user"}
              className="social-btn relative mx-auto bg-white dark:bg-slate-700 flex w-[280px] items-center justify-center rounded-lg border-2 border-solid border-[#ECECEC] py-4 pl-4 pr-0 transition-shadow"
            >
              <FaUserCheck className="absolute left-5 text-black dark:text-white" size={22} />
              <span className="text-sm text-black dark:text-white">
                {UiTranslations.changeToUser}
              </span>
            </button>
            <button
              onClick={() => updateRole("admin")}
              disabled={user?.role === "admin"}
              className="social-btn relative mx-auto bg-white dark:bg-slate-700 flex w-[280px] items-center justify-center rounded-lg border-2 border-solid border-[#ECECEC] py-4 pl-4 pr-0 transition-shadow"
            >
              <FaUserSecret className="absolute left-5 text-black dark:text-white" size={22} />
              <span className="text-sm text-black dark:text-white">
                {UiTranslations.changeToAdmin}
              </span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const RolePageWithProvider = ({ UiTranslations }: { UiTranslations: any }) => {
  return (
    <Provider store={store}>
      <RolePageContainer UiTranslations={UiTranslations} />
    </Provider>
  );
};

export default RolePageWithProvider;
