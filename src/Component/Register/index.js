import { Button, Form, Input } from 'antd'
import React from 'react'
import UserService from '../../services/UserService';
import { MailOutlined, UserAddOutlined, LockOutlined } from '@ant-design/icons';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';
function Register() {
    const navigate = useNavigate();
    const onFinish = (values) => {
        UserService.saveUser({
            ...values,
            type: 3
        }).then((data) => {
            if(data.code == 200){
                navigate("/login");
            }
        });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='sign'>
            <Form
                name="basic"
                layout='vertical'
                initialValues={{ remember: true, }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input prefix={<MailOutlined  className="site-form-item-icon" />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="lastname"
                    rules={[{ required: true, message: 'Please input your lastname!' }]}
                >
                    <Input prefix={<UserAddOutlined  className="site-form-item-icon" />} placeholder="Lastname" />
                </Form.Item>
                <Form.Item
                    name="firstname"
                    rules={[{ required: true, message: 'Please input your firstname!' }]}
                >
                    <Input prefix={<UserAddOutlined  className="site-form-item-icon" />} placeholder="Firstname" />
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
                    <Button type="primary" htmlType="submit" className="login-form-button" > Submit</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Register