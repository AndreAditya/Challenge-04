import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AiTwotoneStar } from "react-icons/ai";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaRegPlayCircle } from "react-icons/fa";

const DetailsMovie = () => {
  const { movieId } = useParams();
  const [detailMovie, setDetailMovie] = useState(null);
  const [genres, setGenres] = useState([]);
  const [customRuntime, setCustomRuntime] = useState("");

  const customDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const getDetailMovie = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_BASEURL
          }/3/movie/${movieId}?language=en-US&page=1`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_AUTH_TOKEN}`,
            },
          }
        );
        const { data } = response;
        // console.log(response.data);

        // if (response.data) {
        //   setDetailMovie(response.data);
        // }

        const runtimeMinutes = data?.runtime;
        const hours = Math.floor(runtimeMinutes / 60);
        const minutes = runtimeMinutes % 60;
        setCustomRuntime(`${hours} hours  ${minutes} minutes`);

        const movieGenres = data.genres.map((genre) => genre.name);
        setGenres(movieGenres);

        setDetailMovie(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getDetailMovie();
  }, [movieId]);

  if (!detailMovie) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100%",
          backgroundSize: "cover",
          backgroundColor: "black",
          backgroundPosition: "center center",
        }}
      >
        <img
          src={`${import.meta.env.VITE_API_BACKDROP_URL}/${
            detailMovie?.backdrop_path
          }`}
          alt={detailMovie.title}
          style={{
            width: "100%",
            filter: "brightness(40%) blur(3px)",
          }}
        />
        <div
          style={{
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            position: "absolute",
          }}
        >
          <div>
            <Container fluid>
              <Row className="d-flex align-items-center vh-100 ">
                <Col className="d-flex align-items-center justify-content-center">
                  <img
                    className="custom-poster"
                    src={`${import.meta.env.VITE_API_IMAGE_URL}/${
                      detailMovie?.poster_path
                    }`}
                    alt=""
                  />
                </Col>
                <Col className="custom-fontdetail">
                  <h1 style={{ fontWeight: "bolder" }}>
                    {detailMovie?.original_title}
                  </h1>

                  <br />
                  <p>
                    {customDate(detailMovie?.release_date)}
                    &nbsp;|&nbsp;
                    <span>{genres.join(" , ")}</span>
                    &nbsp;|&nbsp;
                    <span>
                      <AiTwotoneStar className="star-logo" />
                      {detailMovie?.vote_average.toFixed(1)}
                    </span>
                  </p>
                  <p>{customRuntime}</p>

                  <br />
                  <p style={{ fontSize: "20px" }}>{detailMovie?.overview}</p>
                  <Button
                    variant="danger"
                    className=" align-items-center justify-content-center play-button"
                  >
                    <Link
                      style={{ color: "white" }}
                      as={Link}
                      to={`/trailers/${detailMovie.id}`}
                      className="play-button2"
                    >
                      <FaRegPlayCircle className="play-button" />
                      Watch Trailer
                    </Link>
                  </Button>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsMovie;
