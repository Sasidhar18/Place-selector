import { useCallback, useState, useRef } from "react";
import Header from "./Components/Header";
import Places from "./Components/Places";
import AvailablePlaces from "./Components/AvailablePlaces";
import Modal from "./Components/Modal";
import DeleteConfirmation from "./Components/DeleteConfirmation";
import {
  fetchUserPlacesFromAPI,
  deleteUserPlaces,
  updateUserPlaces,
} from "./Components/Helper/https";
import useFetch from "./Components/Helper/useFetch";

const App = () => {
  const selectedPlace = useRef();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const {
    fetchedData: userPlaces,
    fetching,
    error,
    setFetchedData: setUserPlaces,
  } = useFetch(fetchUserPlacesFromAPI, []);

  const handleStartRemovePlace = (place) => {
    setModalIsOpen(true);
    selectedPlace.current = place;
  };

  const handleStopRemovePlace = () => {
    setModalIsOpen(false);
  };

  // useEffect(() => {
  //   const fetchUserPlaces = async () => {
  //     setIsFetching(true);
  //     try {
  //       const resData = await fetchUserPlacesFromAPI();
  //       if (resData) {
  //         setUserPlaces(resData.places);
  //       }
  //     } catch (error) {
  //       setError("Error in fetching available places");
  //     }
  //     setIsFetching(false);
  //   };
  //   fetchUserPlaces();
  // }, []);

  const handleSelectPlace = async (selectedPlace) => {
    try {
      const response = deleteUserPlaces([selectedPlace, ...userPlaces]);
      if (response) {
        setUserPlaces((prevPickedPlaces) => {
          if (!prevPickedPlaces) {
            prevPickedPlaces = [];
          }
          if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
            return prevPickedPlaces;
          }
          return [selectedPlace, ...prevPickedPlaces];
        });
      } else {
        setUserPlaces(selectedPlace);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemovePlace = useCallback(
    async function handleRemovePlace() {
      const deletePlace = userPlaces.filter(
        (place) => place.id !== selectedPlace.current.id
      );
      try {
        await updateUserPlaces(deletePlace);
      } catch (error) {
        console.log(error)
      }
      setUserPlaces((prevPickedPlaces) =>
        prevPickedPlaces.filter(
          (place) => place.id !== selectedPlace.current.id
        )
      );
      setModalIsOpen(false);
    },
    [userPlaces, setUserPlaces]
  );
  return (
    <>
      <Modal open={modalIsOpen} onclose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>
      <Header />
      <main>
        <Places
          error={error}
          fetching={fetching}
          title="I'd like to visit..."
          fallbackText="Select the places you would like to visit below."
          places={userPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
};

export default App;
