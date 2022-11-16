import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

function DetailPage() {
  const { userID } = useParams(); //mesmo nome do parametro de ROTA (app.js)
  const navigate = useNavigate()

  const [user, setUser] = useState({});

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(
          `https://ironrest.herokuapp.com/enap92/${userID}`
        );
        setUser(response.data);
      } catch (error) {
        console.log(error);
        toast.error("Algo deu errado com o get da API.");
      }
    }
    fetchUser();
  }, []);

  async function handleDelete(e) {
    try {
      await axios.delete(`https://ironrest.herokuapp.com/enap92/${userID}`);
      navigate("/")
      toast.success("Funcionário deletado com sucesso")
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado ao deletar esse usuário.");
    }
  }

  console.log(user);

  return (
    <Container className="my-4">
      <Card className="text-center">
        <Card.Header>
          <Card.Title>{user.nome}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Data de Admissão: {user.dataAdmissao}
          </Card.Subtitle>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <Card.Title>Email</Card.Title>
              <Card.Text>{user.email}</Card.Text>

              <Card.Title>Telefone</Card.Title>
              <Card.Text>{user.tel}</Card.Text>

              <Card.Title>Departamento</Card.Title>
              <Card.Text>{user.departamento}</Card.Text>
            </Col>
            <Col>
              <Card.Title>Cargo</Card.Title>
              <Card.Text>{user.cargo}</Card.Text>

              <Card.Title>Status</Card.Title>
              <Card.Text>{user.status}</Card.Text>

              <Card.Text>
                {user.active ? "Ativa na empresa" : "Não está ativo"}
              </Card.Text>
            </Col>
          </Row>

          <Card.Title></Card.Title>
          <Card.Text></Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
          <Row>
            <Col>
              <Button variant="outline-secondary">Editar Funcionário</Button>
            </Col>
            <Col>
              <Button variant="outline-danger" onClick={handleDelete}>
                Excluir Funcionário
              </Button>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default DetailPage;
