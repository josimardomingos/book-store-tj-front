import ApiService from "@/services/ApiService";

import type { ResponseType } from "../common/types";
import { AutorData } from "./types";

const http = new ApiService();

export const autorIndexService = async (): Promise<
  ResponseType<AutorData[]>
> => {
  return await http.get<ResponseType<AutorData[]>>("/autores");
};

export const autorStoreService = async (
  payload?: AutorData
): Promise<ResponseType<AutorData>> => {
  return await http.post<ResponseType<AutorData>>(`/autores`, payload);
};

export const autorUpdateService = async (
  id?: number,
  payload?: AutorData
): Promise<ResponseType<AutorData>> => {
  return await http.put<ResponseType<AutorData>>(`/autores/${id}`, payload);
};

export const autorDestroyService = async (
  id?: number
): Promise<ResponseType<unknown>> => {
  return await http.delete<ResponseType<unknown>>(`/autores/${id}`);
};
