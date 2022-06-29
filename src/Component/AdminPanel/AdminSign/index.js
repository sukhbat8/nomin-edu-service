import { Button, Form, Input, Select, Checkbox } from 'antd'
import React, { useEffect, useState } from 'react'
import UserService from '../../../services/UserService';
import { MailOutlined, UserAddOutlined, LockOutlined } from '@ant-design/icons';
import './style.css';
import { useNavigate } from 'react-router-dom';
import LessonService from '../../../services/LessonService';
const { Option } = Select;

function AdminSign() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [lesson, setLesson] = useState([]);
    const [type, setType] = useState('2');
    const onFinish = (values) => {
        UserService.saveUser(values).then((data) => {
            if (data.code == 200) {
                navigate("/admin/login");
            }
        });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onFormLayoutChange = ({ type }) => {
        if(type){
            setType(type);
        }
        if (type == 1) {
            LessonService.getLessons().then((res) => {
                if (res.code == 200) {
                    setLesson(res.data);
                }
            });
        }
    };

    return (
        <div className='reg'>
            <Form
                name="basic"
                layout='vertical'
                initialValues={{ type: type, }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                onValuesChange={onFormLayoutChange}
                autoComplete="off"
                form={form}
            >
                <Form.Item
                    name="type"
                    rules={[{ required: true, message: 'Please input your professional!' }]}
                >
                    <Select
                        showSearch
                        placeholder="Select a person"
                        optionFilterProp="children"
                    >
                        <Option value="1">Багш</Option>
                        <Option value="2">Менежер</Option>
                    </Select>
                </Form.Item>
                {type == 1 ? (
                    <div>
                        <Form.Item
                            name="teacherType"
                            rules={[{ required: true, message: 'Та төрлөө сонгоно уу!' }]}
                        >
                            <Select
                                showSearch
                                placeholder="Төрөл"
                                optionFilterProp="children"
                            >
                                <Option value='Үндсэн'>Үндсэн</Option>
                                <Option value="Цагийн">Цагийн</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="lessons_id"
                            rules={[{ required: true, message: 'Та төрлөө сонгоно уу!' }]}
                        >
                            <Select
                                mode="multiple"
                                allowClear
                                placeholder="Заах хичээл"
                                optionFilterProp="children"
                            >
                                {
                                    lesson.map((x, index) => (
                                        <Option key={`lesson${index}`} value={x._id}>{x.name}</Option>
                                    ))
                                }

                            </Select>
                        </Form.Item>
                    </div>
                ) : null}

                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Та мэйл хаяг аа оруулна уу!' }]}
                >
                    <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="lastname"
                    rules={[{ required: true, message: 'Та овог оо оруулна уу!' }]}
                >
                    <Input prefix={<UserAddOutlined className="site-form-item-icon" />} placeholder="Lastname" />
                </Form.Item>
                <Form.Item
                    name="firstname"
                    rules={[{ required: true, message: 'Та нэр ээ оруулна уу!!' }]}
                >
                    <Input prefix={<UserAddOutlined className="site-form-item-icon" />} placeholder="Firstname" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Та нууц үг ээ оруулна уу!' }]}
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

export default AdminSign;