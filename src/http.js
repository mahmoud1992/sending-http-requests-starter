export async function fetchAvailablePlaces() {
  const response = await fetch("http://localhost:3000/places");
  const resDate = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch places.");
  }
  return resDate.places;
}
export async function updateUserPlaces(places) {
  const response = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ places: places }),
  });
  const resDate = await response.json();
  if (!response.ok) {
    throw new Error("Failed to update user places.");
  }
  return resDate.message;
}
