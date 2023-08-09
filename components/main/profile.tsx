"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { updateUser, User } from "@/redux/globalReducer";
import { RootState, store } from "@/redux/store";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { MdManageAccounts } from "react-icons/md";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import SignInModal from "./signInModal";

const Profile = ({ UiTranslations }: { UiTranslations: any }) => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.global.user);
  const { data: session } = useSession();

  useEffect(() => {
    dispatch(updateUser(session?.user as User));
  }, [session?.user]);

  return (
    <>
      {user ? (
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger title="Profile" className="cursor-pointer">
              <img
                className="h-[25px] w-[25px] rounded-full object-cover sm:h-[40px] sm:w-[40px]"
                src={user?.image as string}
                alt="profile-pic"
              />
            </MenubarTrigger>
            <MenubarContent className="dark:bg-slate-700">
              <MenubarItem style={{ backgroundColor: "transparent" }} className="flex gap-2">
                <img
                  className="h-[25px] w-[25px] rounded-full object-cover sm:h-[30px] sm:w-[30px]"
                  src={user?.image as string}
                  alt="profile-pic"
                />
                <div className="space-y-0.5">
                  <p>{user?.name}</p>
                  <p>
                    {UiTranslations.role}: <span className="text-red-400">{user?.role}</span>
                  </p>
                </div>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem className="cursor-pointer text-blue-400">
                <Link href={"/role"}>{UiTranslations.changeRole}</Link>
                <MenubarShortcut>
                  <MdManageAccounts className="text-red-400" size={22} />
                </MenubarShortcut>
              </MenubarItem>
              <MenubarItem
                className="cursor-pointer text-blue-400"
                onClick={() =>
                  signOut({
                    callbackUrl: `${window.location.origin}`,
                  })
                }
              >
                {UiTranslations.signOutBtn}
                <MenubarShortcut>
                  <BiLogOut className="text-red-400" size={22} />
                </MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      ) : (
        <Button
          onClick={() => setOpenModal(true)}
          className="text-black bg-white hover:bg-stone-100 px-2.5 py-1.5 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white"
        >
          {UiTranslations.signInBtn}
        </Button>
      )}
      <SignInModal
        UiTranslations={UiTranslations}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
};

const ProfileWithProvider = ({ UiTranslations }: { UiTranslations: any }) => {
  return (
    <Provider store={store}>
      <Profile UiTranslations={UiTranslations} />
    </Provider>
  );
};

export default ProfileWithProvider;
