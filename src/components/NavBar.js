import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Navbar.Brand as="div">
            <img
              alt="logo da ironhack em cinza escuro e branco"
              src="https://avatars.githubusercontent.com/u/4854004?s=280&v=4"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Ironhack-Enap Turma 92
          </Navbar.Brand>
        </Link>
      </Container>
    </Navbar>
  );
}

export default NavBar;
