import {
  Table,
  Container,
  Button,
  ProgressBar,
  FloatingLabel,
  Form,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import ModalCreateUser from "../components/ModalCreateUser";
import { Link } from "react-router-dom";

function HomePage() {
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      const response = await axios.get("https://ironrest.herokuapp.com/enap92");
      setUsers(response.data);
    }

    fetchUsers();
    console.log("Dentro do useEffect da home!!");
  }, [reload]);

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  return (
    <div>
      <Container>
        <h1>teste</h1>
        <FloatingLabel
          controlId="floatingInput"
          label="Pesquise por nome / departamento / cargo"
          className="my-3"
        >
          <Form.Control
            type="text"
            placeholder="pesquise"
            value={search}
            onChange={handleSearch}
          />
        </FloatingLabel>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Task</th>
              <th>Progresso</th>
              <th>Status</th>
              <th>Departamento</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((user) => {
                return (
                  user.nome.toLowerCase().includes(search.toLowerCase()) ||
                  user.departamento
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  user.cargo.toLowerCase().includes(search.toLowerCase())
                );
              })
              .map((user) => {
                return (
                  <tr key={user._id}>
                    <td>{user.nome}</td>
                    <td>{user.task}</td>
                    <td>
                      <ProgressBar
                        animated
                        now={user.progresso}
                        label={`${user.progresso}%`}
                      />
                    </td>
                    <td>{user.status}</td>
                    <td>{user.departamento}</td>
                    <td>
                      <Link to={`/user/${user._id}`}>
                        <Button variant="outline-secondary" size="sm">
                          Detalhes
                        </Button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>

        <ModalCreateUser reload={reload} setReload={setReload} />
      </Container>
    </div>
  );
}

export default HomePage;
