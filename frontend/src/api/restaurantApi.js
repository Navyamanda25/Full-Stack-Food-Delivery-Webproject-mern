export const fetchRestaurants = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/restaurants`
  );
  return response.json();
};