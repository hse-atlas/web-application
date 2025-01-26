import React from "react";
import { Card, Divider, Button } from "antd";
import {
  MailOutlined,
  UserOutlined,
  EditOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import UserHeader from "../components/UserHeader";
import DetailItem from "../components/DetailItem";
import "../styles/Profile.css";

// Константа с данными пользователя
const userData = {
  name: "John Doe",
  username: "@johndoe",
  email: "john.doe@example.com",
  role: "Admin",
};

const Profile = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSettingsClick = () => {
    navigate("/settings");
  };

  return (
    <div className="profile-page-container">
      <Card className="profile-card">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={handleBackClick}
          style={{ marginBottom: "20px" }}
        ></Button>

        {/* Используем данные из константы */}
        <UserHeader name={userData.name} username={userData.username} />

        <Divider />

        <div className="profile-details">
          <DetailItem
            icon={<MailOutlined className="detail-icon" />}
            label={`Email: ${userData.email}`}
          />
          <DetailItem
            icon={<UserOutlined className="detail-icon" />}
            label={`Role: ${userData.role}`}
          />
        </div>

        <Divider />

        <Button
          type="primary"
          icon={<EditOutlined />}
          block
          onClick={handleSettingsClick}
        >
          Edit Profile
        </Button>
      </Card>
    </div>
  );
};

export default Profile;
