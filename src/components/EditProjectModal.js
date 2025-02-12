import React, { useEffect } from "react";
import { Modal, Form, Input, Button, Space, message } from "antd";
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
      const owner_id = localStorage.getItem("Admin_id"); // Извлекаем owner_id из localStorage
      const payload = { ...values };

      console.log("Отправляемые данные при обновлении:", payload);
      console.log("Отправляемый запрос на изменение проекта с ID:", id);

      const response = await fetch(
        `http://127.0.0.1:90/projects/owner/${id}?owner_id=${owner_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

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

        <Form.Item
          name="url"
          label="Project URL"
          rules={[
            {
              type: "url",
              message: "Please enter a valid URL!",
            },
          ]}
        >
          <Input placeholder="Enter project URL" />
        </Form.Item>
      </Form>

      <div style={{ textAlign: "right", marginTop: "16px" }}>
        <Space>
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
