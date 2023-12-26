"use client";

import React from "react";
import { useLockedBody } from "@/hooks/useBodyLock";
import { SidebarContext } from "@/contexts/layout-context";

import { SidebarWrapper } from "./AdminLayout/sidebar/sidebar";
import { NavbarWrapper } from "./AdminLayout/navbar/navbar";

interface Props {
  children: React.ReactNode;
}

export const AdminLayout = ({ children }: Props) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [_, setLocked] = useLockedBody(false);
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setLocked(!sidebarOpen);
  };

  return (
    <SidebarContext.Provider
      value={{
        collapsed: sidebarOpen,
        setCollapsed: handleToggleSidebar,
      }}
    >
      <section className="flex">
        <SidebarWrapper />
        <NavbarWrapper>{children}</NavbarWrapper>
      </section>
    </SidebarContext.Provider>
  );
};
