import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Select } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import './style.css';
import UserService from '../../../services/UserService';
const { Option } = Select;
const AdminLogin = () => {
    const navigate = useNavigate();
    const onFinish = (values) => {
        UserService.loginUser(values).then((data) => {
            console.log(values);
            if (data.code == 200) {
                localStorage.setItem("token", data.data);
                navigate("/home");
            }
        });
    };
    const onChange = (value) => {
        console.log(`selected ${value}`);
    };

    return (
        <div className='admin'>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ type: '2' }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="type"
                    rules={[{ required: true, message: 'Please input your professional!' }]}
                >
                    <Select
                        showSearch
                        placeholder="Select a person"
                        optionFilterProp="children"
                        onChange={onChange}
                    >
                        <Option value="1">Багш</Option>
                        <Option value="2">Менежер</Option>
                    </Select>
                </Form.Item>
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
                </Form.Item>
                Or
                <Link to='/admin/signin' style={{ color: 'black', fontWeight: 600 }}> register now!</Link>
            </Form>
        </div>
    )
}
export default AdminLogin;