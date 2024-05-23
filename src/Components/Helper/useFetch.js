import { useState, useEffect } from "react";

export default function useFetch(fetchFn, initialValue) {
  const [fetching, setIsFetching] = useState(false);
  const [fetchedData, setFetchedData] = useState(initialValue);
  const [error, setError] = useState();
  useEffect(() => {
    const fetchUserPlaces = async () => {
      setIsFetching(true);
      try {
        const resData = await fetchFn();
        if (resData) {
          setFetchedData(resData.places);
        }
      } catch (error) {
        setError("Error in fetching available places");
      }
      setIsFetching(false);
    };
    fetchUserPlaces();
  }, []);

  return {
    fetchedData,
    fetching,
    error,
    setFetchedData,
  };
}
