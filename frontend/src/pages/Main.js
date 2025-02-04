import React, { useState, useEffect } from "react";
import { Table, Empty, Typography, Space, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ProfileMenu from "../components/ProfileMenu";
import AddProject from "../components/AddProject";
import axios from "axios";
import "../styles/Main.css";

const { Title, Text } = Typography;

const Main = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("Email");
  const userRole = "Admin";

  const fetchProjects = () => {
    setLoading(true);
    axios
      .get(`http://127.0.0.1:90/projects/me?email=${userEmail}`)
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error.response?.data?.detail);
        if (error.response?.status !== 404) {
          // Показываем ошибку, только если это не 404 (проектов нет)
          message.error("Failed to load projects.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProjects();
  }, [userEmail]);

  const handleAddProjectClick = () => {
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddProject = () => {
    fetchProjects();
    setIsModalVisible(false);
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Project Name", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Users", dataIndex: "user_count", key: "user_count" },
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
          {loading ? (
            <div style={{ textAlign: "center" }}>Loading...</div>
          ) : projects.length > 0 ? (
            <Table
              dataSource={projects}
              columns={columns}
              rowKey="id"
              pagination={false}
              onRow={(record) => ({
                onClick: () => navigate(`/project/${record.id}`),
              })}
            />
          ) : (
            <div className="empty-container">
              <Empty description="No Projects Found" />
            </div>
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
