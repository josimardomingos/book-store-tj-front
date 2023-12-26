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
  Select,
  Chip,
  SelectItem,
} from "@nextui-org/react";
import Swal from "sweetalert2";

import { EditIcon } from "@/components/icons/EditIcon";
import { DeleteIcon } from "@/components/icons/DeleteIcon";
import {
  livroDestroyService,
  livroIndexService,
  livroStoreService,
  livroUpdateService,
} from "@/modules/Livro/services";
import { LivroData } from "@/modules/Livro/types";
import { AssuntoData } from "@/modules/Assunto/types";
import { assuntoIndexService } from "@/modules/Assunto/services";

export const metadata: Metadata = {
  title: "Livros",
};

type LivroForm = LivroData & {
  assuntos_cod: number[];
};

const columns = [
  { name: "TÍTULO", uid: "titulo" },
  { name: "EDITORA", uid: "editora" },
  { name: "EDIÇÃO", uid: "edicao" },
  { name: "ANO", uid: "anopublicacao" },
  { name: "VALOR", uid: "valor" },
  { name: "AÇÕES", uid: "actions" },
];

export default function BookPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [livros, setLivros] = useState<LivroData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCreating, setIsCreating] = useState<boolean>(true);
  const [initialState, setInitialState] = useState<LivroData>();

  const [assuntos, setAssuntos] = useState<AssuntoData[]>([]);

  const handleDeleteLivro = (livro: LivroData) => {
    Swal.fire({
      title: `Deseja mesmo remover o livro ${livro.titulo} ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Manda brasa!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await livroDestroyService(livro.codl);

        Swal.fire({
          title: "Livro apagado com sucesso!",
          icon: "success",
        }).then(() => {
          setLivros((prevState) =>
            prevState.filter((prevLivro) => prevLivro.codl !== livro.codl)
          );
        });
      }
    });
  };

  const handleEditarLivro = (livro: LivroData) => {
    setInitialState(livro);
    setIsCreating(false);
    onOpen();
  };

  const handleNovoLivro = () => {
    setIsCreating(true);
    setInitialState({
      titulo: "",
      editora: "",
      anopublicacao: "2023",
      edicao: 0,
      valor: 0,
    });
    onOpen();
  };

  const handleGravarLivro = async (onClose: () => void) => {
    let codas;
    if (initialState.assuntos) {
      codas = initialState.assuntos.map((assunto) => {
        return assunto.codas;
      });
      initialState.assuntos = codas;
    }
    console.log(
      "🚀 ~ file: BookPage.tsx:119 ~ handleGravarLivro ~ initialState:",
      initialState,
      codas
    );
    return;

    let resp;
    if (isCreating) {
      resp = await livroStoreService(initialState);
    } else {
      resp = await livroUpdateService(initialState?.codl, initialState);
    }

    Swal.fire({
      title: resp.message,
      icon: "success",
    }).then(() => {
      fetchData();
      onClose();
    });
  };

  const renderCell = useCallback((livro: LivroData, columnKey: React.Key) => {
    const cellValue = livro[columnKey as keyof LivroData];

    switch (columnKey) {
      case "valor":
        return cellValue.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        });
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Editar">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon onClick={() => handleEditarLivro(livro)} />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Apagar">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon onClick={() => handleDeleteLivro(livro)} />
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

    const response = await livroIndexService();
    setLivros(response.data);
    setIsLoading(false);
  };

  const fetchAssuntos = async () => {
    const response = await assuntoIndexService();
    setAssuntos(response.data);
  };

  useEffect(() => {
    fetchData();
    fetchAssuntos();
  }, []);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:p-7">
      <Card fullWidth>
        <CardBody className="flex flex-row justify-between items-center">
          <h1>Livros </h1>
          <div>
            <Button color="primary" onClick={handleNovoLivro}>
              + Novo livro
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
          items={livros}
          isLoading={isLoading}
          loadingContent={<Spinner size="lg" className="max-w-md" />}
          emptyContent={"Sem livros ainda"}
        >
          {(item) => (
            <TableRow key={item.codl}>
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
                  ? "Novo Livro"
                  : `Alterar Livro - ${initialState?.titulo}`}
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Título"
                  variant="bordered"
                  value={initialState?.titulo}
                  maxLength={40}
                  onValueChange={(value) =>
                    setInitialState((prevState) => ({
                      ...prevState,
                      titulo: value,
                    }))
                  }
                />
                <Input
                  label="Editora"
                  variant="bordered"
                  value={initialState?.editora}
                  maxLength={40}
                  onValueChange={(value) =>
                    setInitialState((prevState) => ({
                      ...prevState,
                      editora: value,
                    }))
                  }
                />
                <div className="flex flex-row justify-between items-center">
                  <div>
                    <Input
                      type="number"
                      min={1}
                      max={100}
                      label="Edição"
                      variant="bordered"
                      value={initialState?.edicao}
                      onValueChange={(value) =>
                        setInitialState((prevState) => ({
                          ...prevState,
                          edicao: value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Input
                      type="number"
                      min={1800}
                      max={2024}
                      label="Ano"
                      variant="bordered"
                      value={initialState?.anopublicacao}
                      maxLength={4}
                      onValueChange={(value) =>
                        setInitialState((prevState) => ({
                          ...prevState,
                          anopublicacao: value,
                        }))
                      }
                    />
                  </div>
                </div>
                <Input
                  type="number"
                  label="Valor"
                  variant="bordered"
                  placeholder="0,00"
                  value={initialState?.valor}
                  onValueChange={(value) =>
                    setInitialState((prevState) => ({
                      ...prevState,
                      valor: value,
                    }))
                  }
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">R$</span>
                    </div>
                  }
                />
                <Select
                  items={assuntos}
                  label="Assuntos"
                  variant="bordered"
                  isMultiline={true}
                  selectionMode="multiple"
                  placeholder="Selecione os assuntos"
                  labelPlacement="outside"
                  classNames={{
                    base: "max-w-xs",
                    trigger: "min-h-unit-12 py-2",
                  }}
                  renderValue={(items) => {
                    console.log("items", items);
                    return (
                      <div className="flex flex-wrap gap-2">
                        {items.map((item) => (
                          <Chip key={item.key}>{item.data.descricao}</Chip>
                        ))}
                      </div>
                    );
                  }}
                >
                  {(assunto) => (
                    <SelectItem
                      key={assunto.codas}
                      textValue={assunto.descricao}
                    >
                      <div className="flex gap-2 items-center">
                        <div className="flex flex-col">
                          <span className="text-small">
                            {assunto.descricao}
                          </span>
                          <span className="text-tiny text-default-400">
                            {assunto.descricao}
                          </span>
                        </div>
                      </div>
                    </SelectItem>
                  )}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancelar
                </Button>
                <Button
                  color="primary"
                  onPress={() => handleGravarLivro(onClose)}
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
