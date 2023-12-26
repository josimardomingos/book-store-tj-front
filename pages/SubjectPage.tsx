"use client";
import { Metadata } from "next";

import React, { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Tooltip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  ModalFooter,
  Button,
  useDisclosure,
  Spinner,
  Card,
  CardBody,
} from "@nextui-org/react";
import Swal from "sweetalert2";

import { EditIcon } from "@/components/icons/EditIcon";
import { DeleteIcon } from "@/components/icons/DeleteIcon";
import {
  assuntoDestroyService,
  assuntoIndexService,
  assuntoStoreService,
  assuntoUpdateService,
} from "@/modules/Assunto/services";
import { AssuntoData } from "@/modules/Assunto/types";

export const metadata: Metadata = {
  title: "Assuntos",
};

const columns = [
  { name: "DESCRIÇÃO", uid: "descricao" },
  { name: "AÇÕES", uid: "actions" },
];

export default function SubjectPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [assuntos, setAssuntos] = useState<AssuntoData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCreating, setIsCreating] = useState<boolean>(true);
  const [initialState, setInitialState] = useState<AssuntoData>();

  const handleDeleteAssunto = (assunto: AssuntoData) => {
    Swal.fire({
      title: `Deseja mesmo remover o assunto ${assunto.descricao} ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Manda brasa!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await assuntoDestroyService(assunto.codas);

        Swal.fire({
          title: "Assunto apagado com sucesso!",
          icon: "success",
        }).then(() => {
          setAssuntos((prevState) =>
            prevState.filter(
              (prevAssunto) => prevAssunto.codas !== assunto.codas
            )
          );
        });
      }
    });
  };

  const handleEditarAssunto = (assunto: AssuntoData) => {
    setInitialState(assunto);
    setIsCreating(false);
    onOpen();
  };

  const handleNovoAssunto = () => {
    setIsCreating(true);
    setInitialState({ descricao: "" });
    onOpen();
  };

  const handleGravarAssunto = async (onClose: () => void) => {
    let resp;
    if (isCreating) {
      resp = await assuntoStoreService(initialState);
    } else {
      resp = await assuntoUpdateService(initialState?.codas, initialState);
    }

    Swal.fire({
      title: resp.message,
      icon: "success",
    }).then(() => {
      fetchData();
      onClose();
    });
  };

  const renderCell = useCallback(
    (assunto: AssuntoData, columnKey: React.Key) => {
      const cellValue = assunto[columnKey as keyof AssuntoData];

      switch (columnKey) {
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Editar">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon onClick={() => handleEditarAssunto(assunto)} />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Apagar">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon onClick={() => handleDeleteAssunto(assunto)} />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  const fetchData = async () => {
    setIsLoading(true);

    const response = await assuntoIndexService();
    setAssuntos(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:p-7">
      <Card fullWidth>
        <CardBody className="flex flex-row justify-between items-center">
          <h1>Assuntos </h1>
          <div>
            <Button color="primary" onClick={handleNovoAssunto}>
              + Novo assunto
            </Button>
          </div>
        </CardBody>
      </Card>
      <Table aria-label="Table of subjects" isStriped isHeaderSticky>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={assuntos}
          isLoading={isLoading}
          loadingContent={<Spinner size="lg" className="max-w-md" />}
          emptyContent={"Sem assuntos ainda"}
        >
          {(item) => (
            <TableRow key={item.codas}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {isCreating
                  ? "Novo Assunto"
                  : `Alterar Assunto - ${initialState?.descricao}`}
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Descrição"
                  variant="bordered"
                  value={initialState?.descricao}
                  maxLength={20}
                  onValueChange={(value) =>
                    setInitialState((prevState) => ({
                      ...prevState,
                      descricao: value,
                    }))
                  }
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancelar
                </Button>
                <Button
                  color="primary"
                  onPress={() => handleGravarAssunto(onClose)}
                >
                  Gravar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
}
