import { Card, Form, Input, Button } from "antd";
import { userApi } from "../../services/userApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    try {
      const { name, email, password, phone } = values;

      await userApi.create({
        name,
        email,
        password,
        phone,
      });

      toast.success("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (e) {
      toast.error("Erro ao cadastrar.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0958d9",
      }}
    >
      <Card title="Cadastro" style={{ width: 300 }}>
        <Form onFinish={handleRegister}>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Digite seu nome" }]}
          >
            <Input placeholder="Nome" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[{ required: true, message: "Digite seu email" }]}
          >
            <Input placeholder="E-mail" />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[{ required: true, message: "Digite seu telefone" }]}
          >
            <Input placeholder="Telefone" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Digite sua senha" }]}
          >
            <Input.Password placeholder="Senha" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Cadastrar
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="link" block onClick={() => navigate("/login")}>
              Já tem uma conta? Entrar
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterPage;
