import React from "react";
import { signOut, useSession } from "next-auth/react";

import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarItem,
} from "@nextui-org/react";

export const UserDropdown = () => {
  const { data: session } = useSession();

  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Avatar
            as="button"
            color="secondary"
            size="md"
            src="https://i.pravatar.cc/150?img=51"
          />
        </DropdownTrigger>
      </NavbarItem>

      <DropdownMenu
        aria-label="User menu actions"
        onAction={(actionKey) => console.log({ actionKey })}
      >
        <DropdownItem
          key="profile"
          className="flex flex-col justify-start w-full items-start"
        >
          <p>{session?.user?.name}</p>
          <p>{session?.user?.email}</p>
        </DropdownItem>
        <DropdownItem key="settings">Minha Conta</DropdownItem>

        <DropdownItem
          key="logout"
          color="danger"
          className="text-danger"
          onClick={() => signOut()}
        >
          Sair
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
