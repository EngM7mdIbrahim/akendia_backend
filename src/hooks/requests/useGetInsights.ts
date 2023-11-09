import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { REACT_QUERY_KEYS } from "../../constants/react-query-keys";
import getInsights from "../../api/get-insights";

export default function useGetInsights (
    options?: UseQueryOptions<any, unknown, any, string[]>
  ) {
    return useQuery([REACT_QUERY_KEYS.IMG_INST], () => getInsights(), {
      ...options,
    });
  };