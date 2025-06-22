import { Modal, Form, Input, Button, Space, message } from "antd";
import { useEffect } from "react";
import { categoryApi } from "../../../../services/categoryApi";
import { toast } from "react-toastify";

const ModalEditCategories = ({ open, onCancel, category, onUpdate }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (category) {
      form.setFieldsValue({
        name: category.name,
      });
    }
  }, [category, form]);

  const handleUpdate = async (values) => {
    try {
      await categoryApi.update(category.id, { name: values.name });
      toast.success("Categoria atualizada com sucesso!");
      onUpdate();
      form.resetFields();
    } catch (error) {
      message.error("Erro ao atualizar categoria");
    }
  };

  return (
    <Modal
      open={open}
      onCancel={() => {
        onCancel();
        form.resetFields();
      }}
      footer={null}
      title={`Editar Categoria`}
    >
      <Form
        form={form}
        onFinish={handleUpdate}
        layout="vertical"
      >
        <Form.Item
          label="Nome da Categoria"
          name="name"
          rules={[{ required: true, message: "Digite o nome da categoria" }]}
        >
          <Input placeholder="Digite o nome" />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button onClick={onCancel}>Cancelar</Button>
            <Button type="primary" htmlType="submit">
              Atualizar
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalEditCategories;
