import Places from "./Places.jsx";
import { fetchAvailablePlacesFromAPI } from "./Helper/https.js";
import useFetch from "./Helper/useFetch.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const {
    fetchedData: availablePlace,
    fetching: isFetching,
    error,
  } = useFetch(fetchAvailablePlacesFromAPI, []);
  return (
    <Places
      error={error}
      fetching={isFetching}
      title="Available Places"
      places={availablePlace}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
