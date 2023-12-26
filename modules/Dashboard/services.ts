import ApiService from "@/services/ApiService";

import type { ResponseType } from "../common/types";
import { DashboardData } from "./types";

const http = new ApiService();

export const dashboardIndexService = async (): Promise<
  ResponseType<DashboardData>
> => {
  return await http.get<ResponseType<DashboardData>>("/dashboard");
};
