import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd"; // Импортируем message
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"; // Импортируем axios
import "../styles/Login.css";

const { Title, Text } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const onFinish = async (values) => {
    console.log("Login values:", values);
    setLoading(true);

    try {
      const response = await axios.post(
        `http://127.0.0.1:9000/api/v1/AuthService/user_login/${id}`,
        {
          email: values.email,
          password: values.password,
        }
      );

      const { access_token, refresh_token } = response.data;
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);

      // Запрашиваем данные проекта, чтобы получить redirect_url
      const projectResponse = await axios.get(
        `http://127.0.0.1:90/projects/getURL/${id}`
      );

      console.log("URL для перенаправления:", projectResponse.data);
      const redirectUrl = projectResponse.data; // || "/";
      // Преобразуем URL в валидный объект URL (если нужно, чтобы гарантировать корректность)
      const validRedirectUrl = new URL(redirectUrl).href; // Преобразуем в валидный URL

      // Перенаправляем на правильный URL
      window.location.href = validRedirectUrl; // Используем window.location.href для перенаправления
    } catch (error) {
      message.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-container">
        <Title level={2}>Welcome</Title>
        <div className="form-container">
          <Form
            name="login"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            requiredMark={false}
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email!",
                },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Login
              </Button>
            </Form.Item>
          </Form>

          <div className="register-link">
            <Text>
              Don't have an account?{" "}
              <a href={`${window.location.origin}/userRegister/${id}`}>
                Register
              </a>
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
