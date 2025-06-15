import { Switch, Tooltip } from "antd";
import { BulbOutlined, BulbFilled } from "@ant-design/icons";
import { useTheme } from "../themeContext";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Tooltip title="Mudar Tema">
      <Switch
        checked={theme === "dark"}
        onChange={toggleTheme}
        checkedChildren={<BulbFilled />}
        unCheckedChildren={<BulbOutlined />}
      />
    </Tooltip>
  );
};

export default ThemeSwitcher;
