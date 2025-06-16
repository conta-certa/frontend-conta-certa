import {
  IdcardOutlined,
  MailOutlined,
  PhoneOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Form,
  Input,
  Spin,
  Typography,
  Upload,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";

const { Title } = Typography;

const ProfilePage = () => {
  const [form] = useForm();

  const [loading, setLoading] = useState();

  return (
    <Card
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Title level={2} className="text-center mb-8">
        Meu Perfil
      </Title>

      <div className="text-center mb-8">
        <Avatar size={100} icon={<UserOutlined />} />
      </div>

      <Form form={form} name="profile" layout="vertical">
        <Form.Item
          name="nome"
          label="Nome Completo"
          rules={[{ required: true, message: "Por favor insira seu nome!" }]}
        >
          <Input prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item name="cpf" label="CPF">
          <Input prefix={<IdcardOutlined />} disabled />
        </Form.Item>

        <Form.Item
          name="telefone"
          label="Telefone"
          rules={[
            { required: true, message: "Por favor insira seu telefone!" },
          ]}
        >
          <Input prefix={<PhoneOutlined />} />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Por favor insira seu email!" },
            { type: "email", message: "Email inválido!" },
          ]}
        >
          <Input prefix={<MailOutlined />} />
        </Form.Item>

        <Form.Item
          name="avatar"
          label="Foto de Perfil"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        >
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            maxCount={1}
            showUploadList={false}
          >
            <div>
              <UploadOutlined />
              <div style={{ marginTop: 8 }}>Alterar Foto</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Salvar Alterações
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ProfilePage;
