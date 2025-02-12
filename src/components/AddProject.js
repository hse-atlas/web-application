import React from "react";
import { Modal, Form, Input, Button, Space, message } from "antd";
import axios from "axios";

const AddProject = ({ visible, onCancel, onAdd }) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const owner_id = Number(localStorage.getItem("Admin_id")); // Преобразуем в число
        if (!owner_id) {
          message.error("Admin ID not found or invalid.");
          return;
        }

        axios
          .post("http://127.0.0.1:90/projects", {
            name: values.name,
            description: values.description,
            owner_id: owner_id,
            url: values.URL || null, // URL может быть пустым
          })
          .then((response) => {
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
            { required: true, message: "Please enter the project name!" },
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

        <Form.Item name="URL" label="Project URL">
          <Input placeholder="Enter project URL (optional)" />
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
