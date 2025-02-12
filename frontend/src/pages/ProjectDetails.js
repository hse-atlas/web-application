import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Table,
  Space,
  Empty,
  Spin,
  Alert,
  Popconfirm,
  message,
  Flex,
  Divider,
} from "antd";
import {
  ArrowLeftOutlined,
  EditOutlined,
  DeleteFilled,
} from "@ant-design/icons";
import ProfileMenu from "../components/ProfileMenu";
import EditProjectModal from "../components/EditProjectModal";
import axios from "axios";

const { Title, Text, Link } = Typography;

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const inviteLink = `${window.location.origin}/userRegister/${id}`;
  const userEmail = localStorage.getItem("Email");
  const owner_id = localStorage.getItem("Admin_id");
  const userRole = "Admin";

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:90/projects/${id}?owner_id=${owner_id}`
        );
        console.log("Полученные данные:", response.data); // Выводим данные в консоль
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

  const handleDelete = async () => {
    try {
      console.log("Отправляемый запрос на удаление проекта с ID:", id);

      const owner_id = localStorage.getItem("Admin_id"); // Получаем owner_id

      const response = await fetch(
        `http://127.0.0.1:90/projects/owner/${id}?owner_id=${owner_id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      message.success("Project deleted successfully");
      navigate("/");
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      message.success("Link copy!");
    } catch (err) {
      message.error("Ошибка копирования ссылки");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      console.log("Отправляем запрос на удаление пользователя с ID:", userId);

      const response = await fetch(`http://127.0.0.1:90/users/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      // После успешного удаления, обновляем список пользователей
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      message.success("User deleted successfully");
    } catch (error) {
      message.error(error.message);
    }
  };

  if (loading) return <Spin size="large" />;
  if (error) return <Alert message={error} type="error" showIcon />;
  if (!project)
    return <Alert message="Проект не найден" type="warning" showIcon />;

  const columns = [
    {
      title: "№",
      key: "index",
      render: (_, __, index) => index + 1,
    },
    { title: "Login", dataIndex: "login", key: "login" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this user?"
          onConfirm={() => handleDeleteUser(record.id)}
          okText="Yes"
          cancelText="No"
          placement="topRight"
        >
          <DeleteFilled />
        </Popconfirm>
      ),
      width: "min-content",
      align: "center",
    },
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

        <Divider />

        <Flex justify="space-between" align="center">
          {/* Левая часть - ссылка */}
          <Link
            onClick={(e) => {
              e.preventDefault();
              handleCopyLink();
            }}
          >
            Invite Users to this Project
          </Link>

          {/* Правая часть - кнопки */}
          <Space>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={handleEditClick}
            >
              Edit project
            </Button>
            <Popconfirm
              title="Are you sure to delete this project?"
              onConfirm={handleDelete}
              okText="Yes"
              cancelText="No"
              placement="topRight"
            >
              <Button danger>Delete Project</Button>
            </Popconfirm>
          </Space>
        </Flex>

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
