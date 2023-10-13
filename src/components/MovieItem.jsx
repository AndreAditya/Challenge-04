import Card from "react-bootstrap/Card";

import PropType from "prop-types";
import { Link } from "react-router-dom";
import imageError from "../assets/image/photo2.jpg";

const imagePoster = import.meta.env.VITE_API_IMAGE_URL;

function MovieItem({ id, title, overview, imageURL }) {
  return (
    <Card
      style={{ width: "14rem" }}
      className="dark-grey"
      as={Link}
      to={`/details/${id}`}
    >
      <Card.Img
        variant="top"
        src={imageURL ? `${imagePoster}${imageURL}` : imageError}
        alt=""
      />
      <Card.Body>
        <Card.Text className="custom-fonttitle">{title}</Card.Text>
        <Card.Text className="text-truncate custom-font">{overview}</Card.Text>
      </Card.Body>
    </Card>
  );
}

MovieItem.propTypes = {
  id: PropType.number.isRequired,
  title: PropType.string.isRequired,
  overview: PropType.string.isRequired,
  imageURL: PropType.string.isRequired,
};

export default MovieItem;
