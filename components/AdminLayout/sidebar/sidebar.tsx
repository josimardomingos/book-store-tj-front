"use client";

import React from "react";
import { usePathname } from "next/navigation";

import { useSidebarContext } from "@/contexts/layout-context";

import { Sidebar } from "./sidebar.styles";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { CompaniesDropdown } from "./companies-dropdown";

import { HomeIcon } from "../../icons/sidebar/home-icon";
import { ReportsIcon } from "../../icons/sidebar/reports-icon";
import { ProductsIcon } from "../../icons/sidebar/products-icon";
import { BalanceIcon } from "../../icons/sidebar/balance-icon";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-[202] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <CompaniesDropdown />
        </div>

        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Dashboard"
              icon={<HomeIcon />}
              isActive={pathname === "/painel"}
              href="/painel"
            />

            <SidebarMenu title="Menu">
              <SidebarItem
                title="Livros"
                icon={<ReportsIcon />}
                isActive={pathname === "/painel/livros"}
                href="/painel/livros"
              />

              <SidebarItem
                title="Assuntos"
                icon={<BalanceIcon />}
                isActive={pathname === "/painel/assuntos"}
                href="/painel/assuntos"
              />

              <SidebarItem
                title="Autores"
                icon={<ProductsIcon />}
                isActive={pathname === "/painel/autores"}
                href="/painel/autores"
              />
            </SidebarMenu>
          </div>
        </div>
      </div>
    </aside>
  );
};
