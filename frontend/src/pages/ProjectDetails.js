import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Button, Table, Space, Divider, Empty } from "antd";
import { ArrowLeftOutlined, EditOutlined } from "@ant-design/icons";
import ProfileMenu from "../components/ProfileMenu";
import EditProjectModal from "../components/EditProjectModal"; // Импортируем новый компонент

const { Title, Text } = Typography;

const ProjectDetails = () => {
  const { id } = useParams(); // Получаем ID проекта из URL
  const navigate = useNavigate();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false); // Состояние для модального окна
  const userEmail = "john.doe@example.com";
  const userRole = "Admin";

  // Получаем данные о проекте из localStorage
  const projects = JSON.parse(localStorage.getItem("projects")) || [];
  const project = projects.find((p) => p.id === parseInt(id));

  // Эмуляция данных о пользователях
  const users = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin" },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "User",
    },
  ];

  // Функция для сохранения данных в localStorage
  const saveProjectsToLocalStorage = (projects) => {
    localStorage.setItem("projects", JSON.stringify(projects));
  };

  // Обработчик открытия модального окна редактирования
  const handleEditClick = () => {
    setIsEditModalVisible(true);
  };

  // Обработчик сохранения изменений
  const handleEditSave = (values) => {
    const updatedProjects = projects.map((p) =>
      p.id === project.id ? { ...p, ...values } : p
    );
    saveProjectsToLocalStorage(updatedProjects); // Сохраняем изменения в localStorage
    setIsEditModalVisible(false); // Закрываем модальное окно
    navigate(0); // Перезагружаем страницу для обновления данных
  };

  // Обработчик закрытия модального окна
  const handleEditModalCancel = () => {
    setIsEditModalVisible(false);
  };

  if (!project) {
    return <div>Project not found</div>;
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
  ];

  return (
    <div className="page-container">
      <div className="main-container">
        <div className="header">
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} />

          <Title level={2}>{project.name}</Title>
          <Space align="center" size="middle">
            <ProfileMenu email={userEmail} role={userRole} />
            <Space direction="vertical">
              <Text type="secondary">{userRole}</Text>
              <Text strong>{userEmail}</Text>
            </Space>
          </Space>
        </div>
        <Text type="secondary">{project.description}</Text>

        <Divider />

        {/* Кнопка "Редактировать проект" */}
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={handleEditClick}
          style={{ marginBottom: "16px" }}
        >
          Edit Project
        </Button>

        <Title level={4}>Users</Title>

        <div className="projects-container">
          {users.length > 0 ? (
            <Table
              dataSource={users}
              columns={columns}
              rowKey="id"
              pagination={false}
            />
          ) : (
            <Empty description="No Users Found" />
          )}
        </div>
      </div>

      {/* Модальное окно для редактирования проекта */}
      <EditProjectModal
        visible={isEditModalVisible}
        onCancel={handleEditModalCancel}
        onSave={handleEditSave}
        initialValues={{
          name: project.name,
          description: project.description,
        }}
      />
    </div>
  );
};

export default ProjectDetails;
