import React from "react";
import { Table, Empty, Typography, Space } from "antd";
import ProfileMenu from "../components/ProfileMenu";
import "../styles/Main.css";
import projectsData from "../projects.json"; // Импорт JSON-файла

const { Title, Text } = Typography;

const Main = () => {
  // Будут извлекаться из БД
  const userEmail = "john.doe@example.com";
  const userRole = "Admin";

  // Временное использование данных из JSON-файла
  const projects = projectsData;

  // Пример обращения к беку
  // useEffect(() => {
  //   fetch("/api/projects")
  //     .then((response) => response.json())
  //     .then((data) => setProjects(data))
  //     .catch((error) => console.error("Error fetching projects:", error));
  // }, []);

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
            <ProfileMenu email={userEmail} role={userRole} />
            <Space direction="vertical">
              <Text type="secondary">{userRole}</Text>
              <Text strong>{userEmail}</Text>
            </Space>
          </Space>
        </div>

        <div className="projects-container">
          {projects.length > 0 ? (
            <Table
              dataSource={projects}
              columns={columns}
              rowKey="id"
              pagination={false} // Пагинация Выключена
            />
          ) : (
            <Empty description="No Projects Found" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
