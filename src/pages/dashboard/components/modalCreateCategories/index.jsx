import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Table, message } from "antd";
import { useEffect, useState } from "react";
import { categoryApi } from "../../../../services/categoryApi";
import ModalUpdateCategories from "../modalUpdateCategories";
import { toast } from "react-toastify";

const ModalCreateCategories = ({ open, onCancel }) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  const getCategories = async () => {
    try {
      const response = await categoryApi.getAll();
      setCategories(response.data);
    } catch (error) {
      message.error("Erro ao buscar categorias");
    }
  };

  useEffect(() => {
    if (open) {
      getCategories();
    }
  }, [open]);

  const handleCreate = async (values) => {
    try {
      await categoryApi.create({ name: values.name });
      toast.success("Categoria criada com sucesso!");
      form.resetFields();
      getCategories();
    } catch (error) {
      message.error("Erro ao criar categoria");
    }
  };

  const columns = [
    {
      title: "Categoria",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ação",
      key: "action",
      render: (_, record) => (
        <Button
          icon={<EditOutlined />}
          onClick={() => {
            setCategoryToEdit(record);
            setOpenEdit(true);
          }}
        />
      ),
    },
  ];

  return (
    <>
      <Modal
        open={open}
        onCancel={onCancel}
        footer={null}
        title="Criar Categoria"
      >
        <Form
          form={form}
          onFinish={handleCreate}
          layout="vertical"
          className="mb-4"
        >
          <Form.Item
            label="Nome da Categoria"
            name="name"
            rules={[{ required: true, message: "Digite o nome da categoria" }]}
          >
            <Input placeholder="Digite o nome" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
              Adicionar Categoria
            </Button>
          </Form.Item>
        </Form>

        <Table
          dataSource={categories}
          columns={columns}
          rowKey="id"
          size="small"
          pagination={false}
        />
      </Modal>

      <ModalUpdateCategories
        open={openEdit}
        onCancel={() => setOpenEdit(false)}
        category={categoryToEdit}
        onUpdate={() => {
          getCategories();
          setOpenEdit(false);
        }}
      />
    </>
  );
};

export default ModalCreateCategories;
