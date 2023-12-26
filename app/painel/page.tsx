"use client";

import React, { useEffect, useState } from "react";

import { dashboardIndexService } from "@/modules/Dashboard/services";
import { DashboardData } from "@/modules/Dashboard/types";
import {
  Card,
  CardBody,
  CardHeader,
  CircularProgress,
  Divider,
} from "@nextui-org/react";

export default function Page() {
  const [dashboard, setDashboard] = useState<DashboardData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setIsLoading(true);
    const resp = await dashboardIndexService();
    setDashboard(resp.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="flex flex-row items-center justify-center gap-2 grid grid-cols-12 py-8 px-8 md:py-10">
      {isLoading ? (
        <CircularProgress aria-label="Carregando..." />
      ) : (
        <>
          <Card className="col-span-12 sm:col-span-4 h-[300px]">
            <CardHeader className="flex flex-row justify-center items-center">
              <span style={{ fontSize: 64 }}>Livros</span>
            </CardHeader>
            <Divider />
            <CardBody className="flex flex-row justify-center items-center">
              <span style={{ fontSize: 72 }}>{dashboard?.livros}</span>
            </CardBody>
          </Card>
          <Card className="col-span-12 sm:col-span-4 h-[300px]">
            <CardHeader className="flex flex-row justify-center items-center">
              <span style={{ fontSize: 64 }}>Autores</span>
            </CardHeader>
            <Divider />
            <CardBody className="flex flex-row justify-center items-center">
              <span style={{ fontSize: 72 }}>{dashboard?.autores}</span>
            </CardBody>
          </Card>
          <Card className="col-span-12 sm:col-span-4 h-[300px]">
            <CardHeader className="flex flex-row justify-center items-center">
              <span style={{ fontSize: 64 }}>Assuntos</span>
            </CardHeader>
            <Divider />
            <CardBody className="flex flex-row justify-center items-center">
              <span style={{ fontSize: 72 }}>{dashboard?.assuntos}</span>
            </CardBody>
          </Card>
        </>
      )}
    </section>
  );
}
