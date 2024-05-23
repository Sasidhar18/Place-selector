export async function fetchUserPlacesFromAPI() {
  const response = await fetch("http://localhost:3000/user-places");
  const resData = await response.json();

  if (response.ok) {
    return resData;
  }

  throw new Error("Error in Fetching available places");
}

export async function fetchAvailablePlacesFromAPI() {
  const response = await fetch("http://localhost:3000/places");
  const resData = await response.json();

  if (response.ok) {
    return resData;
  }

  throw new Error("Error in Fetching available places");
}

export async function deleteUserPlaces(places) {
  const response = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ places }),
  });

  if (response.ok) {
    return response.json();
  }

  throw new Error("Failed in update userplaces");
}

export async function updateUserPlaces(places) {
  const response = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      places,
    }),
  });

  if (response.ok) {
    return response.json();
  }

  throw new Error("Failed in update userplaces");
}
