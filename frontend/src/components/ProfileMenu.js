import React from "react";
import { Avatar, Dropdown, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const ProfileMenu = () => {
  const navigate = useNavigate();

  const handleMenuClick = ({ key }) => {
    switch (key) {
      case "profile":
        navigate("/profile");
        break;
      case "settings":
        navigate("/settings");
        break;
      case "logout":
        // Здесь можно добавить логику для выхода (например, очистка токена)
        navigate("/login");
        break;
      default:
        break;
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      {/*<Menu.Item key="settings" icon={<SettingOutlined />}>
        Settings
      </Menu.Item>*/}
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <Avatar
        size="large"
        icon={<UserOutlined />}
        style={{ cursor: "pointer", backgroundColor: "#243168" }}
      />
    </Dropdown>
  );
};

export default ProfileMenu;
