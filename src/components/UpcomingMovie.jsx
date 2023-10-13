import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import MovieItem from "../components/MovieItem";

const UpcomingMovie = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    const getUpcomingMovies = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_BASEURL
          }/3/movie/upcoming?language=en-US&page=2`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_AUTH_TOKEN}`,
            },
          }
        );
        const { data } = response;

        setUpcomingMovies(data?.results);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(error?.response.data?.status_message);
          return;
        }
        alert(error?.message);
      }
    };

    getUpcomingMovies();
  }, []);

  if (upcomingMovies.length === 0) {
    return <h3>Loading...</h3>;
  }

  return (
    <>
      <Container className="pb-5" fluid>
        <Row className="pt-5 mx-1 my-4 xd-flex justify-content-between">
          <Col className="d-flex align-items-center justify-content-center">
            <h1 className="m-0" style={{ color: "white" }}>
              Upcoming Movie
            </h1>
          </Col>
        </Row>
        <Row className="d-flex justify-content-between gx-1 gy-5">
          {upcomingMovies.map((movie) => (
            <Col className="d-flex justify-content-center px-3" key={movie?.id}>
              <MovieItem
                id={movie?.id}
                imageURL={
                  import.meta.env.VITE_API_IMAGE_URL + movie?.poster_path
                }
                overview={movie?.overview}
                title={movie?.title}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default UpcomingMovie;
