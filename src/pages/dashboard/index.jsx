import { Button, Card, Form, InputNumber, Select, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import "./style.css";

const Dashboard = () => {
  return (
    <Card
      title="Calcule suas finanças abaixo"
      className="cardContainerDashboard"
    >
      <Form layout="vertical">
        <Form.Item
          label="Coloque uma Quantia Abaixo"
          name="transaction"
          rules={[
            { required: true, message: "Coloque o valor neste campo..." },
          ]}
        >
          <InputNumber className="valueInput" placeholder="Digite o valor" />
        </Form.Item>

        <Form.Item
          label="Descrição (Opcional)"
          name="description"
        >
          <TextArea
            className="descriptionArea"
            rows={3}
            placeholder="Adicione uma descrição"
          />
        </Form.Item>

        <Form.Item
          label="Categoria"
          name="category"
          rules={[
            { required: true, message: "Selecione uma categoria" },
          ]}
        >
          <Select
            className="categorySelect"
            placeholder="Selecione uma categoria"
            options={[
              { label: "Alimentação", value: "food" },
              { label: "Transporte", value: "transport" },
              { label: "Lazer", value: "fun" },
            ]}
          />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary">Adicionar</Button>
            <Button danger>Retirar</Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Dashboard;
