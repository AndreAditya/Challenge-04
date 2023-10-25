import {
  Button,
  Container,
  Col,
  Navbar,
  Form,
  InputGroup,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RiMovie2Fill } from "react-icons/ri";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";

function NavbarComponent() {
  const navigate = useNavigate();
  const [result, setResult] = useState("");

  const goToResultSearch = (event) => {
    event.preventDefault();
    navigate(`/movie/search/${result}`);
    setResult("");
  };

  return (
    <Navbar className="navbar" expand="lg" sticky="top">
      <Container className="d-flex justify-content-between" fluid>
        <Col className="mx-3">
          <Navbar.Brand className="custom-brand" as={Link} to="/">
            <RiMovie2Fill className="navbarlogo" />
            Movielist
          </Navbar.Brand>
        </Col>
        <Col className="mx-3">
          <form onSubmit={goToResultSearch} action="">
            <InputGroup>
              <Form.Control
                type="text"
                className="search"
                placeholder="Search Movie"
                aria-label="search Movie"
                aria-describedby="basic-addon2"
                onChange={() => setResult(event.target.value)}
              />
              <Button id="button-nav">
                <BiSearch />
              </Button>
            </InputGroup>
          </form>
        </Col>
        <Col className="mx-3 d-flex justify-content-end">
          <Button
            variant="outline-danger"
            className=" custom-buttonnavbar mx-2"
          >
            Login
          </Button>
          <Button variant="danger" className=" custom-buttonnavbar mx-2">
            Register
          </Button>
        </Col>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
