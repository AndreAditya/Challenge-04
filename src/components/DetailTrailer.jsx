import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Iframe from "react-iframe";
import { Container } from "react-bootstrap";

const DetailTrailer = () => {
  const { movieId } = useParams();
  const [trailerMovie, setTrailerMovie] = useState(null);
  const [poster, setPoster] = useState(null);

  useEffect(() => {
    const getPoster = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_BASEURL
          }/3/movie/${movieId}?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_AUTH_TOKEN}`,
            },
          }
        );
        console.log(response.data);

        if (response.data) {
          setPoster(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getPoster();
  }, [movieId]);

  useEffect(() => {
    const getTrailerMovie = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_BASEURL
          }/3/movie/${movieId}/videos?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_AUTH_TOKEN}`,
            },
          }
        );

        if (response.data.results.length > 0) {
          // Ambil key dari video pertama dari respons API
          const videoKey = response.data.results[0].key;
          setTrailerMovie(videoKey);
        }
      } catch (error) {
        console.log("Error fetching movie data", error);
      }
    };
    getTrailerMovie();
  }, [movieId]);

  if (trailerMovie === null) {
    return (
      <>
        <Container>
          <div className="custom-error">Data Not Found!</div>
        </Container>
      </>
    );
  }

  return (
    <div>
      <img
        style={{
          width: "100%",
          filter: "brightness(40%) blur(3px)",
        }}
        src={`https://image.tmdb.org/t/p/w1280/${poster?.backdrop_path}`}
      />

      <Container fluid>
        <Iframe
          className="custom-iframe"
          src={`https://www.youtube.com/embed/${trailerMovie}`}
          title={trailerMovie?.name}
          allowfullscreen
        ></Iframe>
      </Container>
    </div>
  );
};

export default DetailTrailer;
