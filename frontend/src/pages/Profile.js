import React from "react";
import { Card, Divider, Button } from "antd";
import {
  MailOutlined,
  UserOutlined,
  EditOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // Хук для навигации
import UserHeader from "../components/UserHeader";
import DetailItem from "../components/DetailItem";
import "../styles/Profile.css";

const Profile = () => {
  const navigate = useNavigate(); // Инициализация хука для навигации

  const handleBackClick = () => {
    navigate(-1); // Возвращаемся на предыдущую страницу
  };

  const handleSettingsClick = () => {
    navigate("/settings");
  };

  return (
    <div className="profile-page-container">
      <Card className="profile-card">
        {/* Кнопка назад */}
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={handleBackClick}
          style={{ marginBottom: "20px" }}
        ></Button>

        <UserHeader name="John Doe" username="@johndoe" />

        <Divider />

        <div className="profile-details">
          <DetailItem
            icon={<MailOutlined className="detail-icon" />}
            label="Email: john.doe@example.com"
          />
          <DetailItem
            icon={<UserOutlined className="detail-icon" />}
            label="Role: Admin"
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
