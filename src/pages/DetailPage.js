import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";

function DetailPage() {
  const { userID } = useParams(); //mesmo nome do parametro de ROTA (app.js)
  const navigate = useNavigate();

  const [showEdit, setShowEdit] = useState(false);
  const [reload, setReload] = useState(false);
  const [user, setUser] = useState({});
  const [form, setForm] = useState({
    nome: "",
    salario: "",
    email: "",
    tel: "",
    departamento: "",
    dataAdmissao: "",
    status: "",
    stack: [],
    active: true,
    task: "",
    progresso: "",
    foto: "",
    cargo: "",
  });

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(
          `https://ironrest.herokuapp.com/enap92/${userID}`
        );
        setUser(response.data);
        setForm(response.data);
      } catch (error) {
        console.log(error);
        toast.error("Algo deu errado com o get da API.");
      }
    }
    fetchUser();
  }, [reload]);

  function handleChange(e) {
    if (e.target.name === "active") {
      setForm({ ...form, active: e.target.checked });
      return;
    }

    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleDelete(e) {
    try {
      await axios.delete(`https://ironrest.herokuapp.com/enap92/${userID}`);
      navigate("/");
      toast.success("Funcionário deletado com sucesso");
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado ao deletar esse usuário.");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const clone = { ...form };
      delete clone._id;

      await axios.put(`https://ironrest.herokuapp.com/enap92/${userID}`, clone);

      toast.success("Alterações salvas");
      setReload(!reload);
      setShowEdit(false);
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado. Tente novamente.");
    }
  }

  console.log(form);

  return (
    <Container className="my-4">
      {/* Card User */}
      {showEdit === false && (
        <Card className="text-center" bg="light">
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
              <Col className="col-2">
                <img
                  src={user.foto}
                  alt="pequena foto de perfil do usuário"
                  height={150}
                  style={{ borderRadius: "15px" }}
                />
              </Col>
            </Row>

            <Card.Title></Card.Title>
            <Card.Text></Card.Text>
          </Card.Body>
          <Card.Footer className="text-muted">
            <Row>
              <Col>
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowEdit(true)}
                >
                  Editar Funcionário
                </Button>
              </Col>
              <Col>
                <Button variant="outline-danger" onClick={handleDelete}>
                  Excluir Funcionário
                </Button>
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      )}

      {/* Card User Edit */}
      {showEdit === true && (
        <Card className="text-center" bg="light">
          <Card.Body>
            <Form>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Nome do Funcionário</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Insira o nome completo do funcionário"
                      name="nome"
                      value={form.nome}
                      onChange={handleChange}
                      autoFocus
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Cargo</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Insira nome do cargo do funcionário"
                      name="cargo"
                      value={form.cargo}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Numero de Telefone</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Insira o telefone do funcionário"
                      name="tel"
                      value={form.tel}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Insira o email do funcionário"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Salário</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Insira o valor do salário R$"
                      name="salario"
                      value={form.salario}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Departamento</Form.Label>
                    <Form.Select
                      name="departamento"
                      onChange={handleChange}
                      defaultValue={form.departamento}
                    >
                      <option>Selecione uma opção</option>
                      <option value="Front-End">Front-End</option>
                      <option value="Back-End">Back-End</option>
                      <option value="Mobile">Mobile</option>
                      <option value="Financeiro">Financeiro</option>
                      <option value="Marketing">Marketing</option>
                      <option value="People">People</option>
                      <option value="Full-Stack">Full-Stack</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Data de Admissão</Form.Label>
                    <Form.Control
                      type="date"
                      name="dataAdmissao"
                      value={form.dataAdmissao}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Adicione sua foto</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Insira a url da sua foto de perfil"
                      name="foto"
                      value={form.foto}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Card.Body>
          <Card.Footer className="text-muted">
            <Row>
              <Col>
                <Button
                  variant="outline-danger"
                  onClick={() => setShowEdit(false)}
                >
                  Voltar
                </Button>
              </Col>
              <Col>
                <Button variant="outline-success" onClick={handleSubmit}>
                  Salvar Alterações
                </Button>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Check
                    type="checkbox"
                    label="Funcionário ativo na empresa"
                    name="active"
                    checked={form.active}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      )}
    </Container>
  );
}

export default DetailPage;
