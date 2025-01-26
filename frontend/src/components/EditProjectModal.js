import React from "react";
import { Modal, Form, Input, Button, Space } from "antd";

const EditProjectModal = ({
  visible,
  onCancel,
  onSave,
  initialValues, // Начальные значения для формы
}) => {
  const [form] = Form.useForm();

  // Устанавливаем начальные значения формы при открытии модального окна
  React.useEffect(() => {
    if (visible) {
      form.setFieldsValue(initialValues);
    }
  }, [visible, initialValues, form]);

  // Обработчик сохранения изменений
  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        onSave(values); // Передаем новые значения в родительский компонент
        form.resetFields(); // Очищаем форму
      })
      .catch((error) => {
        console.error("Validation failed:", error);
      });
  };

  return (
    <Modal
      title="Edit Project"
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
          <Button type="primary" onClick={handleSave}>
            Edit
          </Button>
        </Space>
      </div>
    </Modal>
  );
};

export default EditProjectModal;
