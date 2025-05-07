import { useQuery } from "@tanstack/react-query";
import { getSettings as getSettingsAPI } from "../../services/apiSettings";

export function useSettings() {
  const {
    data: settings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettingsAPI, // should filled with async function or function that return promise
  });
  return { settings, isLoading, error };
}
