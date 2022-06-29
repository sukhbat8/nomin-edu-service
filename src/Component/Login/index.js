import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import './style.css';
import UserService from '../../services/UserService';
const Login = () => {
    const navigate = useNavigate();
    const onFinish = (values) => {
        UserService.loginUser({
            ...values,
            type: 3
        }).then((data) => {
            console.log(values);
            if(data.code == 200){
                localStorage.setItem("token", data.data);
                navigate("/home");
            }
        });
    };
    return (
        <div className='register'>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    
                    Or 
                    <Link to='/signUp' > register now!</Link>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login