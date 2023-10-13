import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieItem from "../components/MovieItem";
import { Container, Row, Col } from "react-bootstrap";
import { searchDataMovie } from "../api/SearchApi";

const SearchMovie = () => {
  const { query } = useParams();
  const [searchMovie, setSearchMovie] = useState([]);

  useEffect(() => {
    searchDataMovie(query)
      .then((result) => {
        setSearchMovie(result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [query]);

  if (searchMovie.length === 0) {
    return (
      <Container>
        <div className="custom-error">Data Not Found</div>
      </Container>
    );
  }

  return (
    <>
      <Container className="pt-5">
        <Row className="mx-1 my-4 xd-flex justify-content-between">
          <Col className="d-flex align-items-center justify-content-center">
            <h1 className="mt-5" style={{ color: "white", fontSize: "30px" }}>
              Result for {`'${query}'`}
            </h1>
          </Col>
        </Row>
        <Row className="d-flex justify-content-between gx-1 gy-5">
          {searchMovie.map((movie) => (
            <Col className="d-flex justify-content-center px-0" key={movie?.id}>
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

export default SearchMovie;
