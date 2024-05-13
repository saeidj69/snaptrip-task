import { useState, useEffect, useRef } from "react";
import axios from "axios";

interface ApiResponse<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
  getData: () => void;
}

const useApiRequest = <T,>(url: string): ApiResponse<T | null> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const prevApi = useRef<string>(); // store current api 

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios(url);
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const getData = () => {
    if (prevApi.current !== url) {
      // get data if current api change
      fetchData();
      prevApi.current = url; 
    }
  };

  useEffect(() => {
    fetchData();
    prevApi.current = url; 
  }, [url]); 

  return { data, error, loading, getData };
};

export default useApiRequest;
