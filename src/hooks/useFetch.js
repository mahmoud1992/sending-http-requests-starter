import { useEffect, useState } from "react";

export function useFetch(fetchFn, initialValue) {
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [fetchedDate, setFetchData] = useState(initialValue);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchFn();
        setFetchData(data);
      } catch (error) {
        setError({ message: error.message || "Failed to fetch Date." });
      }
      setIsFetching(false);
    }
    fetchData();
  }, [fetchFn]);
  return { isFetching, error, fetchedDate, setFetchData };
}
