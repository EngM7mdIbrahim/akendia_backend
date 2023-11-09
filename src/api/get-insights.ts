import { apiClient } from "../constants/settings";

export default async function getInsights() {
  const { data } = await apiClient.get("/images/get-stats");
  return data;
}
