import { Card, Form, Input, Button } from "antd";

const LoginPage = () => {
  const onFinish = (values) => {
    console.log("Login:", values);
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
      <Card title="Login" style={{ width: 300 }}>
        <Form onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Digite seu usuário" }]}
          >
            <Input placeholder="Usuário" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Digite sua senha" }]}
          >
            <Input.Password placeholder="Senha" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Entrar
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
