import ApiService from "@/services/ApiService";

import type { ResponseType } from "../common/types";
import { LivroData } from "./types";

const http = new ApiService();

export const livroIndexService = async (): Promise<
  ResponseType<LivroData[]>
> => {
  return await http.get<ResponseType<LivroData[]>>("/livros");
};

export const livroStoreService = async (
  payload?: LivroData
): Promise<ResponseType<LivroData>> => {
  return await http.post<ResponseType<LivroData>>(`/livros`, payload);
};

export const livroUpdateService = async (
  id?: number,
  payload?: LivroData
): Promise<ResponseType<LivroData>> => {
  return await http.put<ResponseType<LivroData>>(`/livros/${id}`, payload);
};

export const livroDestroyService = async (
  id?: number
): Promise<ResponseType<unknown>> => {
  return await http.delete<ResponseType<unknown>>(`/livros/${id}`);
};
