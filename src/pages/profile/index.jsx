import {
  MailOutlined,
  PhoneOutlined,
  UploadOutlined,
  UserOutlined
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
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { userApi } from "../../services/userApi";

const { Title } = Typography;

const ProfilePage = () => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null); // arquivo do upload
  const [avatarPreview, setAvatarPreview] = useState(null); // preview da imagem

  const getUser = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");

      if (!userId) {
        toast.error("Usuário não encontrado");
        return;
      }

      const { data } = await userApi.getById(userId);
      setUser(data);

      form.setFieldsValue({
        name: data.name,
        email: data.email,
        phone: data.phone,
        cpf: data.id,
      });

      if (data.avatar) {
        setAvatarPreview(`${import.meta.env.VITE_API_URL}${data.avatar}`);
      }
    } catch (e) {
      toast.error("Erro ao buscar usuário");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleUpdateUser = async (values) => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");
      if (!userId) {
        toast.error("Usuário não encontrado");
        return;
      }

      let avatarPath = user?.avatar || null;
      if (avatarFile) {
        const uploadResponse = await userApi.uploadAvatar(avatarFile);
        avatarPath = uploadResponse.data.path || uploadResponse.data.avatar || avatarPath;
      }

      await userApi.update(userId, {
        name: values.name,
        phone: values.phone,
        email: values.email,
        avatar: avatarPath,
      });

      toast.success("Perfil atualizado com sucesso!");
      setUser({ ...user, ...values, avatar: avatarPath });
      if (avatarPath) setAvatarPreview(`${import.meta.env.VITE_API_URL}${avatarPath}`);
    } catch (e) {
      console.error(e);
      toast.error("Erro ao atualizar perfil");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadChange = ({ file }) => {
    if (file.status === "removed") {
      setAvatarFile(null);
      setAvatarPreview(null);
      return;
    }

    if (file.originFileObj) {
      setAvatarFile(file.originFileObj);

      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file.originFileObj);
    }
  };

  return (
    <Spin spinning={loading}>
      <Card
        style={{
          width: "100%",
          maxWidth: 500,
          margin: "auto",
        }}
      >
        <Title level={2} className="text-center mb-8">
          Meu Perfil
        </Title>

        <div className="text-center mb-8">
          <Avatar
            size={100}
            src={avatarPreview}
            icon={!avatarPreview && <UserOutlined />}
          />
        </div>

        <Form
          form={form}
          name="profile"
          layout="vertical"
          onFinish={handleUpdateUser}
        >
          <Form.Item
            name="name"
            label="Nome Completo"
            rules={[{ required: true, message: "Por favor insira seu nome!" }]}
          >
            <Input prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item
            name="phone"
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
              beforeUpload={() => false} // impede upload automático
              onChange={handleUploadChange}
              accept="image/*"
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
    </Spin>
  );
};

export default ProfilePage;
