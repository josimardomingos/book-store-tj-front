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
  autorDestroyService,
  autorIndexService,
  autorStoreService,
  autorUpdateService,
} from "@/modules/Autor/services";
import { AutorData } from "@/modules/Autor/types";

export const metadata: Metadata = {
  title: "Autores",
};

const columns = [
  { name: "NOME", uid: "nome" },
  { name: "AÇÕES", uid: "actions" },
];

const avatares = [
  "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  "https://i.pravatar.cc/150?u=a04258114e29026702d",
  "https://i.pravatar.cc/150?u=a048581f4e29026701d",
  "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
  "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  "https://i.pravatar.cc/150?u=a04258114e29026702d",
  "https://i.pravatar.cc/150?u=a048581f4e29026701d",
  "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
  "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  "https://i.pravatar.cc/150?u=a04258114e29026702d",
  "https://i.pravatar.cc/150?u=a048581f4e29026701d",
  "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
  "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  "https://i.pravatar.cc/150?u=a04258114e29026702d",
  "https://i.pravatar.cc/150?u=a048581f4e29026701d",
  "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
  "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  "https://i.pravatar.cc/150?u=a04258114e29026702d",
  "https://i.pravatar.cc/150?u=a048581f4e29026701d",
  "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
];

export default function AuthorPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [autores, setAutores] = useState<AutorData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCreating, setIsCreating] = useState<boolean>(true);
  const [initialState, setInitialState] = useState<AutorData>();

  const handleDeleteAutor = (autor: AutorData) => {
    Swal.fire({
      title: `Deseja mesmo remover o autor ${autor.nome} ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Manda brasa!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await autorDestroyService(autor.codau);

        Swal.fire({
          title: "Autor apagado com sucesso!",
          icon: "success",
        }).then(() => {
          setAutores((prevState) =>
            prevState.filter((prevAutor) => prevAutor.codau !== autor.codau)
          );
        });
      }
    });
  };

  const handleEditarAutor = (autor: AutorData) => {
    setInitialState(autor);
    setIsCreating(false);
    onOpen();
  };

  const handleNovoAutor = () => {
    setIsCreating(true);
    setInitialState({ nome: "" });
    onOpen();
  };

  const handleGravarAutor = async (onClose: () => void) => {
    let resp;
    if (isCreating) {
      resp = await autorStoreService(initialState);
    } else {
      resp = await autorUpdateService(initialState?.codau, initialState);
    }

    Swal.fire({
      title: resp.message,
      icon: "success",
    }).then(() => {
      fetchData();
      onClose();
    });
  };

  const renderCell = useCallback((autor: AutorData, columnKey: React.Key) => {
    const cellValue = autor[columnKey as keyof AutorData];

    switch (columnKey) {
      case "nome":
        return (
          <User
            avatarProps={{
              radius: "lg",
              isBordered: true,
              src: avatares[autor["codau"] || 1],
            }}
            name={cellValue}
          ></User>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Editar">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon onClick={() => handleEditarAutor(autor)} />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Apagar">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon onClick={() => handleDeleteAutor(autor)} />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const fetchData = async () => {
    setIsLoading(true);

    const response = await autorIndexService();
    setAutores(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:p-7">
      <Card fullWidth>
        <CardBody className="flex flex-row justify-between items-center">
          <h1>Autores </h1>
          <div>
            <Button color="primary" onClick={handleNovoAutor}>
              + Novo Autor
            </Button>
          </div>
        </CardBody>
      </Card>
      <Table aria-label="Table of authors" isStriped isHeaderSticky>
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
          items={autores}
          isLoading={isLoading}
          loadingContent={<Spinner size="lg" className="max-w-md" />}
          emptyContent={"Sem autores ainda"}
        >
          {(item) => (
            <TableRow key={item.codau}>
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
                  ? "Novo Autor"
                  : `Alterar Autor - ${initialState?.nome}`}
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Nome"
                  variant="bordered"
                  value={initialState?.nome}
                  maxLength={40}
                  onValueChange={(value) =>
                    setInitialState((prevState) => ({
                      ...prevState,
                      nome: value,
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
                  onPress={() => handleGravarAutor(onClose)}
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
