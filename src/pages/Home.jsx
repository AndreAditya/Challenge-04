import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import CarouselComponent from "../components/Carousel";
import MovieItem from "../components/MovieItem";
import UpcomingMovie from "../components/UpcomingMovie";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const slicedPopularMovies = popularMovies.slice(0, 18);

  useEffect(() => {
    const getPopularMovies = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_BASEURL
          }/3/movie/popular?language=en-US&page=1`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_AUTH_TOKEN}`,
            },
          }
        );
        const { data } = response;

        setPopularMovies(data?.results);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(error?.response.data?.status_message);
          return;
        }
        alert(error?.message);
      }
    };

    getPopularMovies();
  }, []);

  if (popularMovies.length === 0) {
    return <h3>Loading...</h3>;
  }

  return (
    <>
      <CarouselComponent />
      <Container className="pt-5" fluid>
        <Row className="mx-1 my-4 xd-flex justify-content-between">
          <Col className="d-flex align-items-center justify-content-center">
            <h1 className="m-0" style={{ color: "white" }}>
              Popular Movie
            </h1>
          </Col>
        </Row>
        <Row className="d-flex justify-content-between gx-1 gy-5">
          {slicedPopularMovies.map((movie) => (
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
      <UpcomingMovie />
    </>
  );
};

export default Home;
