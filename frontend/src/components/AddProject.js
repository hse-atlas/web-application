import React from "react";
import { Modal, Form, Input, Button, Space, message } from "antd";
import axios from "axios";

const AddProject = ({ visible, onCancel, onAdd }) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        // Извлекаем email из localStorage
        const email = localStorage.getItem("Email");
        if (!email) {
          message.error("User email not found.");
          return;
        }

        // Отправляем запрос на создание проекта
        axios
          .post(
            "http://127.0.0.1:90/projects", // Адрес API
            {
              name: values.name,
              description: values.description,
              email: email, // Отправляем email
            }
          )
          .then((response) => {
            // Если проект создан успешно, вызываем onAdd и сбрасываем форму
            onAdd(response.data);
            form.resetFields();
            message.success("Project added successfully!");
          })
          .catch((error) => {
            console.error("Error creating project:", error);
            message.error("Failed to create project.");
          });
      })
      .catch((error) => {
        console.error("Validation failed:", error);
      });
  };

  return (
    <Modal
      title="Add New Project"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Project Name"
          rules={[
            {
              required: true,
              message: "Please enter the project name!",
            },
          ]}
        >
          <Input placeholder="Enter project name" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: "Please enter the project description!",
            },
          ]}
        >
          <Input.TextArea placeholder="Enter project description" />
        </Form.Item>
      </Form>

      <div style={{ textAlign: "right", marginTop: "16px" }}>
        <Space>
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" onClick={handleSubmit}>
            Add
          </Button>
        </Space>
      </div>
    </Modal>
  );
};

export default AddProject;
