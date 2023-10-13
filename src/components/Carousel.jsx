import { useState, useEffect } from "react";
import { Carousel, Image, Row, Col, Container, Button } from "react-bootstrap";
import axios from "axios";
import movieTrailer from "movie-trailer";
import ReactPlayer from "react-player";
import { FaRegPlayCircle } from "react-icons/fa";
import { AiTwotoneStar } from "react-icons/ai";

const CarouselComponent = () => {
  const [index, setIndex] = useState(0);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [errors, setErrors] = useState({
    isError: false,
    message: null,
  });
  const [video] = useState("");
  const [videoURL, setVideoURL] = useState("");

  const customDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
    console.log(selectedIndex);
  };

  useEffect(() => {
    const getNowPlayingMovies = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_BASEURL
          }/3/movie/now_playing?language=en-US&page=1`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_AUTH_TOKEN}`,
            },
          }
        );
        const { data } = response;

        setNowPlayingMovies(data?.results);
        setErrors({ ...errors, isError: false });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setErrors({
            ...errors,
            isError: true,
            message: error?.response?.data?.status_message || error?.message,
          });
          return;
        }

        alert(error?.message);
        setErrors({
          ...errors,
          isError: true,
          message: error?.message,
        });
      }
    };

    getNowPlayingMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (errors.isError) {
    return <h1>{errors.message}</h1>;
  }

  if (nowPlayingMovies.length === 0) {
    return <h1>Loading....</h1>;
  }

  // Button Trailer
  const buttonTrailer = (id) => {
    const trailer = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASEURL}/3/movie/${id}/videos`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_AUTH_TOKEN}`,
            },
          }
        );
        const { data } = response;

        console.log(data);
        setVideoURL(`https://youtu.be/${data?.results[0].key}`);
        setErrors({ ...errors, isError: false });
      } catch (error) {
        console.log(error);
      }
    };

    trailer();

    movieTrailer(video).then(() => {
      setVideoURL(videoURL);
    });
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <Image
          xs={6}
          md={4}
          className="backdrop"
          src={
            import.meta.env.VITE_API_BACKDROP_URL +
            nowPlayingMovies[0]?.backdrop_path
          }
        />
        <Container className="caption-carousel d-flex align-items-center" fluid>
          <Row className="m-2 p-4">
            <Col md={8} lg={6}>
              <h1 className="carousel-title mb-4">
                {nowPlayingMovies[0].title}
              </h1>
              <p className="carousel-detail mb-4">
                {nowPlayingMovies[0].overview}
              </p>
              <p className="carousel-detail mb-4">
                {customDate(nowPlayingMovies[0].release_date)}
                &nbsp;|&nbsp;
                <span className="text-yellow-400 ">
                  <AiTwotoneStar className="play-button star-logo" />
                  {nowPlayingMovies[0].vote_average}
                </span>
              </p>
              <Button
                className="play-button"
                variant="danger"
                onClick={() => buttonTrailer(nowPlayingMovies[0]?.id)}
              >
                <FaRegPlayCircle className="play-button2" />
                Watch Trailer
              </Button>
            </Col>
            <Col md={4}>
              <ReactPlayer url={videoURL} controls={true} />
            </Col>
          </Row>
        </Container>
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image
          xs={6}
          md={4}
          className="backdrop"
          src={
            import.meta.env.VITE_API_BACKDROP_URL +
            nowPlayingMovies[1]?.backdrop_path
          }
        />
        <Container className="caption-carousel d-flex align-items-center" fluid>
          <Row className="m-2 p-4">
            <Col md={8} lg={6}>
              <h1 className="carousel-title mb-4">
                {nowPlayingMovies[1].title}
              </h1>
              <p className="carousel-detail mb-4">
                {nowPlayingMovies[1].overview}
              </p>
              <p className="carousel-detail mb-4">
                {customDate(nowPlayingMovies[1].release_date)}
                &nbsp;|&nbsp;
                <span className="text-yellow-400 ">
                  <AiTwotoneStar className="play-button star-logo" />
                  {nowPlayingMovies[1].vote_average}
                </span>
              </p>
              <Button
                className="play-button"
                variant="danger"
                onClick={() => buttonTrailer(nowPlayingMovies[1]?.id)}
              >
                <FaRegPlayCircle className="play-button" />
                Watch Trailer
              </Button>
            </Col>
            <Col md={4}>
              <ReactPlayer url={videoURL} controls={true} />
            </Col>
          </Row>
        </Container>
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image
          xs={6}
          md={4}
          className="backdrop"
          src={
            import.meta.env.VITE_API_BACKDROP_URL +
            nowPlayingMovies[2]?.backdrop_path
          }
        />
        <Container className="caption-carousel d-flex align-items-center" fluid>
          <Row className="m-2 p-4">
            <Col md={8} lg={6}>
              <h1 className="carousel-title mb-4">
                {nowPlayingMovies[2].title}
              </h1>
              <p className="carousel-detail mb-4">
                {nowPlayingMovies[2].overview}
              </p>
              <p className="carousel-detail mb-4">
                {customDate(nowPlayingMovies[2].release_date)}
                &nbsp;|&nbsp;
                <span className="text-yellow-400 ">
                  <AiTwotoneStar className="play-button star-logo" />
                  {nowPlayingMovies[2].vote_average}
                </span>
              </p>
              <Button
                className="play-button"
                variant="danger"
                onClick={() => buttonTrailer(nowPlayingMovies[2]?.id)}
              >
                <FaRegPlayCircle className="play-button" />
                Watch Trailer
              </Button>
            </Col>
            <Col md={4}>
              <ReactPlayer url={videoURL} controls={true} />
            </Col>
          </Row>
        </Container>
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image
          xs={6}
          md={4}
          className="backdrop"
          src={
            import.meta.env.VITE_API_BACKDROP_URL +
            nowPlayingMovies[3]?.backdrop_path
          }
        />
        <Container className="caption-carousel d-flex align-items-center" fluid>
          <Row className="m-2 p-4">
            <Col md={8} lg={6}>
              <h1 className="carousel-title mb-4">
                {nowPlayingMovies[3].title}
              </h1>
              <p className="carousel-detail mb-4">
                {nowPlayingMovies[3].overview}
              </p>
              <p className="carousel-detail mb-4">
                {customDate(nowPlayingMovies[3].release_date)}
                &nbsp;|&nbsp;
                <span className="text-yellow-400 ">
                  <AiTwotoneStar className="play-button star-logo" />
                  {nowPlayingMovies[3].vote_average}
                </span>
              </p>
              <Button
                className="play-button"
                variant="danger"
                onClick={() => buttonTrailer(nowPlayingMovies[3]?.id)}
              >
                <FaRegPlayCircle className="play-button" />
                Watch Trailer
              </Button>
            </Col>
            <Col md={4}>
              <ReactPlayer url={videoURL} controls={true} />
            </Col>
          </Row>
        </Container>
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image
          xs={6}
          md={4}
          className="backdrop"
          src={
            import.meta.env.VITE_API_BACKDROP_URL +
            nowPlayingMovies[4]?.backdrop_path
          }
        />
        <Container className="caption-carousel d-flex align-items-center" fluid>
          <Row className="m-2 p-4">
            <Col md={8} lg={6}>
              <h1 className="carousel-title mb-4">
                {nowPlayingMovies[4].title}
              </h1>
              <p className="carousel-detail mb-4">
                {nowPlayingMovies[4].overview}
              </p>
              <p className="carousel-detail mb-4">
                {customDate(nowPlayingMovies[4].release_date)}
                &nbsp;|&nbsp;
                <span className="text-yellow-400 ">
                  <AiTwotoneStar className="play-button star-logo" />
                  {nowPlayingMovies[4].vote_average}
                </span>
              </p>
              <Button
                className="play-button"
                variant="danger"
                onClick={() => buttonTrailer(nowPlayingMovies[4]?.id)}
              >
                <FaRegPlayCircle className="play-button" />
                Watch Trailer
              </Button>
            </Col>
            <Col md={4}>
              <ReactPlayer url={videoURL} controls={true} />
            </Col>
          </Row>
        </Container>
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image
          xs={6}
          md={4}
          className="backdrop"
          src={
            import.meta.env.VITE_API_BACKDROP_URL +
            nowPlayingMovies[5]?.backdrop_path
          }
        />
        <Container className="caption-carousel d-flex align-items-center" fluid>
          <Row className="m-2 p-4">
            <Col md={8} lg={6}>
              <h1 className="carousel-title mb-4">
                {nowPlayingMovies[5].title}
              </h1>
              <p className="carousel-detail mb-4">
                {nowPlayingMovies[5].overview}
              </p>
              <p className="carousel-detail mb-4">
                {customDate(nowPlayingMovies[5].release_date)}
                &nbsp;|&nbsp;
                <span className="text-yellow-400 ">
                  <AiTwotoneStar className="play-button star-logo" />
                  {nowPlayingMovies[5].vote_average}
                </span>
              </p>
              <Button
                className="play-button"
                variant="danger"
                onClick={() => buttonTrailer(nowPlayingMovies[5]?.id)}
              >
                <FaRegPlayCircle className="play-button" />
                Watch Trailer
              </Button>
            </Col>
            <Col md={4}>
              <ReactPlayer url={videoURL} controls={true} />
            </Col>
          </Row>
        </Container>
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselComponent;
