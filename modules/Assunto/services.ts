import ApiService from "@/services/ApiService";

import type { ResponseType } from "../common/types";
import { AssuntoData } from "./types";

const http = new ApiService();

export const assuntoIndexService = async (): Promise<
  ResponseType<AssuntoData[]>
> => {
  return await http.get<ResponseType<AssuntoData[]>>("/assuntos");
};

export const assuntoStoreService = async (
  payload?: AssuntoData
): Promise<ResponseType<AssuntoData>> => {
  return await http.post<ResponseType<AssuntoData>>(`/assuntos`, payload);
};

export const assuntoUpdateService = async (
  id?: number,
  payload?: AssuntoData
): Promise<ResponseType<AssuntoData>> => {
  return await http.put<ResponseType<AssuntoData>>(`/assuntos/${id}`, payload);
};

export const assuntoDestroyService = async (
  id?: number
): Promise<ResponseType<unknown>> => {
  return await http.delete<ResponseType<unknown>>(`/assuntos/${id}`);
};
