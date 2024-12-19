import React from "react";
import { List, Card, Empty, Typography } from "antd";
import ProfileMenu from "../components/ProfileMenu";
import "../styles/Main.css";

const { Title } = Typography;

const projects = []; // Здесь будет массив проектов, сейчас он пустой для примера

const Main = () => {
  return (
    <div className="page-container">
      <div className="main-container">
        <div className="header">
          <Title level={2}>Projects</Title>
          <ProfileMenu />
        </div>

        <div className="projects-container">
          {projects.length > 0 ? (
            <List
              grid={{ gutter: 16, column: 3 }}
              dataSource={projects}
              renderItem={(project) => (
                <List.Item>
                  <Card title={project.name}>{project.description}</Card>
                </List.Item>
              )}
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
