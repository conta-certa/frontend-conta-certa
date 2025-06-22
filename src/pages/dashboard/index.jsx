import {
  Button,
  Card,
  Form,
  InputNumber,
  Select,
  Space,
  message,
  Typography,
  Spin,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import "./style.css";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import ModalCreateCategories from "./components/modalCreateCategories";
import { toast } from "react-toastify";
import { categoryApi } from "../../services/categoryApi";
import { transactionApi } from "../../services/transactionApi";

const { Title } = Typography;

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [form] = Form.useForm();

  const getCategories = async () => {
    try {
      const response = await categoryApi.getAll();
      setCategories(response.data);
    } catch (error) {
      message.error("Erro ao buscar categorias");
    }
  };

  const getTransactions = async () => {
    try {
      setLoading(true);
      const response = await transactionApi.getAll();
      setTransactions(response.data);

      const total = response.data.reduce((acc, transaction) => {
        if (transaction.type === "INCOME") {
          return acc + transaction.amount;
        } else if (transaction.type === "EXPENSE") {
          return acc - transaction.amount;
        }
        return acc;
      }, 0);

      setBalance(total);
    } catch (error) {
      message.error("Erro ao buscar transações");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
    getTransactions();
  }, []);

  const handleTransaction = async (type) => {
    try {
      const values = await form.validateFields();

      await transactionApi.create({
        amount: values.transaction,
        type,
        description: values.description || "",
        categoryId: values.category,
        date: new Date().toISOString(),
      });

      toast.success(
        type === "INCOME"
          ? "Entrada registrada com sucesso!"
          : "Saída registrada com sucesso!"
      );

      form.resetFields();
      getTransactions();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao registrar transação");
    }
  };

  return (
    <>
      <Spin spinning={loading}>
        <Card
          title="Calcule suas finanças abaixo"
          className="cardContainerDashboard"
        >
          <Title level={3}>Saldo atual: R$ {balance.toFixed(2)}</Title>

          <Form layout="vertical" form={form}>
            <Form.Item
              label="Coloque uma Quantia Abaixo"
              name="transaction"
              rules={[
                { required: true, message: "Coloque o valor neste campo..." },
              ]}
            >
              <InputNumber
                className="valueInput"
                placeholder="Digite o valor"
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item label="Descrição (Opcional)" name="description">
              <TextArea
                className="descriptionArea"
                rows={3}
                placeholder="Adicione uma descrição"
              />
            </Form.Item>

            <Space align="end">
              <Form.Item
                label="Categoria"
                name="category"
                rules={[{ required: true, message: "Selecione uma categoria" }]}
              >
                <Select
                  placeholder="Selecione uma categoria"
                  options={categories.map((cat) => ({
                    label: cat.name,
                    value: cat.id,
                  }))}
                  style={{ width: 250 }}
                />
              </Form.Item>

              <Button
                onClick={() => setOpenModalCreate(true)}
                icon={<PlusOutlined />}
              />
            </Space>

            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  onClick={() => handleTransaction("INCOME")}
                >
                  Adicionar
                </Button>
                <Button danger onClick={() => handleTransaction("EXPENSE")}>
                  Retirar
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </Spin>

      <ModalCreateCategories
        open={openModalCreate}
        onCancel={() => {
          setOpenModalCreate(false);
          getCategories();
        }}
      />
    </>
  );
};

export default Dashboard;
