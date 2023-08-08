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
import { User } from "@/redux/globalReducer";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { MdManageAccounts } from "react-icons/md";
import { Button } from "../ui/button";
import SignInModal from "./signInModal";

const Profile = ({ user }: { user: User | null }) => {
  const [openModal, setOpenModal] = useState(false);

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
                    Role: <span className="text-red-400">{user?.role}</span>
                  </p>
                </div>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem className="cursor-pointer text-blue-400">
                <Link href={"/role"}>Change role</Link>
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
                Sign out
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
          Sign in
        </Button>
      )}
      <SignInModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};

export default Profile;
