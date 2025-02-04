import React, { useEffect } from "react";
import { Modal, Form, Input, Button, Space, Popconfirm, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const EditProjectModal = ({ visible, onCancel, onSave, initialValues }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(initialValues);
    }
  }, [visible, initialValues, form]);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const email = localStorage.getItem("Email");
      const payload = { ...values, email };

      console.log("Отправляемые данные при обновлении:", payload);
      console.log("Отправляемый запрос на изменение проекта с ID:", id);

      const response = await fetch(`http://127.0.0.1:90/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to update project");
      }

      message.success("Project updated successfully");
      onSave(payload);
      onCancel();
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      console.log("Отправляемый запрос на удаление проекта с ID:", id);

      const response = await fetch(`http://127.0.0.1:90/projects/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      message.success("Project deleted successfully");
      onCancel();
      navigate("/");
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <Modal
      title="Edit Project"
      open={visible}
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
      </Form>

      <div style={{ textAlign: "right", marginTop: "16px" }}>
        <Space>
          <Popconfirm
            title="Are you sure to delete this project?"
            onConfirm={handleDelete}
            okText="Yes"
            cancelText="No"
            placement="topRight"
          >
            <Button danger>Delete Project</Button>
          </Popconfirm>

          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Space>
      </div>
    </Modal>
  );
};

export default EditProjectModal;
