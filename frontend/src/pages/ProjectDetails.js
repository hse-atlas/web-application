import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Table,
  Space,
  Divider,
  Empty,
  Spin,
  Alert,
} from "antd";
import { ArrowLeftOutlined, EditOutlined } from "@ant-design/icons";
import ProfileMenu from "../components/ProfileMenu";
import EditProjectModal from "../components/EditProjectModal";
import axios from "axios";

const { Title, Text } = Typography;

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const userEmail = localStorage.getItem("Email");
  const userRole = "Admin";

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:90/projects/${id}?email=${userEmail}`
        );
        setProject(response.data);
        setUsers(response.data.users);
      } catch (error) {
        setError(error.response?.data?.detail || "Ошибка при загрузке данных");
      } finally {
        setLoading(false);
      }
    };
    fetchProjectDetails();
  }, [id]);

  const handleEditClick = () => {
    setIsEditModalVisible(true);
  };

  const handleEditSave = (values) => {
    setProject((prev) => ({ ...prev, ...values }));
    setIsEditModalVisible(false);
  };

  const handleEditModalCancel = () => {
    setIsEditModalVisible(false);
  };

  if (loading) return <Spin size="large" />;
  if (error) return <Alert message={error} type="error" showIcon />;
  if (!project)
    return <Alert message="Проект не найден" type="warning" showIcon />;

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Имя", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Роль", dataIndex: "role", key: "role" },
  ];

  return (
    <div className="page-container">
      <div className="main-container">
        <div className="header">
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} />
          <Title level={2}>{project.name}</Title>
          <Space align="center" size="middle">
            <ProfileMenu />
            <Space direction="vertical">
              <Text type="secondary">{userRole}</Text>
              <Text strong>{userEmail}</Text>
            </Space>
          </Space>
        </div>
        <Text type="secondary">{project.description}</Text>

        <div style={{ textAlign: "right", marginBottom: "16px" }}>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={handleEditClick}
          >
            Редактировать проект
          </Button>
        </div>

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
            <Empty description="No users in project" />
          )}
        </div>
      </div>

      <EditProjectModal
        visible={isEditModalVisible}
        onCancel={handleEditModalCancel}
        onSave={handleEditSave}
        initialValues={{ name: project.name, description: project.description }}
      />
    </div>
  );
};

export default ProjectDetails;
