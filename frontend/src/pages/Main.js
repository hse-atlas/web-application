import React, { useState, useEffect } from "react";
import { Table, Empty, Typography, Space, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // Добавляем useNavigate
import ProfileMenu from "../components/ProfileMenu";
import AddProject from "../components/AddProject";
import "../styles/Main.css";

const { Title, Text } = Typography;

const getProjectsFromLocalStorage = () => {
  const projects = localStorage.getItem("projects");
  return projects ? JSON.parse(projects) : [];
};

const saveProjectsToLocalStorage = (projects) => {
  localStorage.setItem("projects", JSON.stringify(projects));
};

const Main = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [projects, setProjects] = useState(getProjectsFromLocalStorage());
  const navigate = useNavigate(); // Инициализируем useNavigate

  const userEmail = "john.doe@example.com";
  const userRole = "Admin";

  useEffect(() => {
    const savedProjects = getProjectsFromLocalStorage();
    setProjects(savedProjects);
  }, []);

  const handleAddProjectClick = () => {
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddProject = (values) => {
    const newProject = {
      id: projects.length + 1,
      name: values.name,
      description: values.description,
      userCount: 0,
    };

    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    saveProjectsToLocalStorage(updatedProjects);
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Project Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Users",
      dataIndex: "userCount",
      key: "userCount",
    },
  ];

  return (
    <div className="page-container">
      <div className="main-container">
        <div className="header">
          <Title level={2}>Projects</Title>
          <Space align="center" size="middle">
            <ProfileMenu />
            <Space direction="vertical">
              <Text type="secondary">{userRole}</Text>
              <Text strong>{userEmail}</Text>
            </Space>
          </Space>
        </div>

        <div style={{ textAlign: "right", marginBottom: "16px" }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddProjectClick}
          >
            Add Project
          </Button>
        </div>

        <div className="projects-container">
          {projects.length > 0 ? (
            <Table
              dataSource={projects}
              columns={columns}
              rowKey="id"
              pagination={false}
              onRow={(record) => ({
                onClick: () => navigate(`/project/${record.id}`), // Переход на страницу проекта
              })}
            />
          ) : (
            <Empty description="No Projects Found" />
          )}
        </div>

        <AddProject
          visible={isModalVisible}
          onCancel={handleModalCancel}
          onAdd={handleAddProject}
        />
      </div>
    </div>
  );
};

export default Main;
