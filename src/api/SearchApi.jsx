import axios from "axios";

export const searchDataMovie = async (q) => {
  const search = await axios.get(
    `${import.meta.env.VITE_API_BASEURL}/3/search/movie?query=${q}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_AUTH_TOKEN}`,
      },
    }
  );
  return search.data.results;
};
