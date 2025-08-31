import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import type { Country } from "../interface";

export const useFetch = (url: string) => {
  const [data, setData] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios(`${url}`);
        setData(response.data);
        setLoading(false);
      } catch (e) {
        const err = e as AxiosError;
        setError(err.message);
        setLoading(false);
      }
    };
    getData();
  }, [url]);

  return { data, loading, error };
};
