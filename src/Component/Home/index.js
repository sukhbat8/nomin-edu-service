import { Button, Col, Form, Input, Layout, Menu, Modal, Row, Space, DatePicker, Select, InputNumber, Alert, message, Card, Typography, Avatar } from 'antd';
import React, { useEffect, useState } from 'react';
import Lesson from '../Lesson';
import './style.css';
import { PlusSquareOutlined, WalletOutlined, LogoutOutlined, HeartOutlined } from '@ant-design/icons';
import LessonService from '../../services/LessonService';
import "swiper/css/effect-coverflow";
import UserService from '../../services/UserService';
import TrainingService from '../../services/TrainingService';
import { useNavigate } from 'react-router-dom';

const { Header, Content } = Layout;
const { Option } = Select;
const { Title } = Typography;
const Home = () => {
    const [training, setTraining] = useState([]);
    const [lesson, setLesson] = useState([]);
    const [level, setLevel] = useState([]);
    const [teacher, setTeacher] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    useEffect(() => {
        LessonService.getLessons().then((res) => {
            if (res.code == 200) {
                setLesson(res.data);
            }
        });
        LessonService.getLevels().then((res) => {
            if (res.code == 200) {
                setLevel(res.data);
            }
        });
        UserService.getUserInfo().then((res) => {
            if (res.code == 200) {
                setUserInfo(res.data);
            }
        });
        TrainingService.getTraining().then((res) => {
            if (res.code == 200) {
                setTraining(res.data);
            }
        })
    }, []);
    const navigate = useNavigate();


    const [isModalVisible, setIsModalVisible] = useState(false);
    const [levelOptions, setLevelOptions] = useState([]);
    const [form] = Form.useForm();
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleCancel = () => {
        form.resetFields();
        setIsModalVisible(false);
    };
    const onFinish = (values) => {
        LessonService.saveLessons({
            ...values,
            status: 'Үүссэн'
        }).then((res) => {
            if (res.code == 200) {
                handleCancel();
                message.success('Хичээл амжилттай нэмэгдлээ!');
            }
        });
    }
    const onFormLayoutChange = ({ lesson_id }) => {
        if (lesson_id) {
            setLevelOptions(level.filter(x => x.lesson_id == lesson_id));
            form.setFieldsValue({ level_id: null });
            form.setFieldsValue({ teacher_id: null });
            LessonService.getTeachers(lesson_id).then((res) => {
                if (res.code == 200) {
                    setTeacher(res.data);
                }
            });
        }
    };
    const logout = () => {
        localStorage.clear();
        navigate("/login")
    };
    const AddLesson = () => {
        if(userInfo?.type == 2){
            return <div>
                <Button type="primary" onClick={showModal} ><PlusSquareOutlined />Хичээл нэмэх</Button>
            </div>
        }
        return null;
        
    };
    return (
        <Layout>
            <Header>
                <div className='container'>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <div>
                            <div className="logo" />
                            <Menu
                                theme="dark"
                                mode="horizontal"
                                defaultSelectedKeys={['1']}
                                items={new Array(4).fill(null).map((_, index) => {
                                    const key = index + 1;
                                    return {
                                        key,
                                        label: `Цонх ${key}`,
                                    };
                                })} />
                        </div>
                        <Space direction='horizontal' style={{ justifyContent: "center" }}>
                            <Avatar size={32} src="https://joeschmoe.io/api/v1/random" style={{ border: "1px solid white" }} />
                            <Title level={5} style={{ margin: 0, color: "white" }}>{`${userInfo?.lastName} ${userInfo?.firstName}`}</Title>
                            <Button style={{ width: 90, textAlign: 'left', padding: 0, margin: 0 }} onClick={logout}> <LogoutOutlined />Log Out</Button>
                        </Space>
                    </div>
                </div>
            </Header>
            <Content className='container content'>
                <div style={{ display: "flex", width: "100%", justifyContent: "end" }}>
                    {AddLesson()}
                    <Modal title="Бүртгэлийн цонх" visible={isModalVisible} footer={null} onCancel={handleCancel}>
                        <Form
                            name="normal_login"
                            initialValues={{ remember: true }}
                            form={form}
                            onFinish={onFinish}
                            onValuesChange={onFormLayoutChange}
                        >
                            <Row gutter={16}>
                                <Col xs={24} md={12}>
                                    <Form.Item name="lesson_id" rules={[{ required: true, message: 'Та хичээлийн нэрийг сонгоно уу!' }]}>
                                        <Select
                                            showSearch
                                            placeholder="Хичээлийн нэр"
                                            optionFilterProp="children"
                                            filterOption={(input, option) => option.children.includes(input)}
                                            filterSort={(optionA, optionB) =>
                                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                            }
                                        >
                                            {
                                                lesson.map((x, index) => (
                                                    <Option key={`lesson${index}`} value={x._id}>{x.name}</Option>
                                                ))
                                            }
                                        </Select>
                                    </Form.Item>
                                    <Form.Item name="level_id" rules={[{ required: true, message: 'Та сургалтийн түвшин сонгоно уу!' }]}>
                                        <Select
                                            showSearch
                                            placeholder="Сургалтын түвшин"
                                            optionFilterProp="children"
                                            filterOption={(input, option) => option.children.includes(input)}
                                            filterSort={(optionA, optionB) =>
                                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                            }
                                        >
                                            {
                                                levelOptions.map((x, index) => (
                                                    <Option key={`level${index}`} value={x._id}>{x.name}</Option>
                                                ))
                                            }
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        name="startDate"
                                        rules={[{ required: true, message: 'Та эхлэх огноо оруулна уу!' }]}
                                    >
                                        <DatePicker placeholder='Эхлэх огноо' style={{ width: '100%' }} />
                                    </Form.Item>
                                    <Form.Item
                                        name="endDate"
                                        rules={[{ required: true, message: 'Та дуусах огноо оруулна уу!' }]}
                                    >
                                        <DatePicker placeholder='Дуусах огноо' style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item name="teacher_id" rules={[{ required: true, message: 'Та хичээл заах багш сонгоно уу!' }]}>
                                        <Select
                                            showSearch
                                            placeholder="Хичээл заах багш"
                                            optionFilterProp="children"
                                            filterOption={(input, option) => option.children.includes(input)}
                                            filterSort={(optionA, optionB) =>
                                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                            }
                                        >{
                                                teacher.map((x, index) => (
                                                    <Option key={`teacher${index}`} value={x._id}>{x.user_id?.firstName}</Option>
                                                ))
                                            }
                                        </Select>
                                    </Form.Item>
                                    <Form.Item name="studentCount" rules={[{ required: true, message: 'Та сурагчдын тоо оруулна уу!' }]}>
                                        <InputNumber style={{ width: '100%' }} min={1} max={100} placeholder='Сурагчдын тоо' />
                                    </Form.Item>
                                    <Form.Item
                                        name="payment"
                                        rules={[{ required: true, message: 'Та төлбөрийн дүн оруулна уу!' }]}
                                    >
                                        <Input
                                            prefix={<WalletOutlined className="site-form-item-icon" />}
                                            placeholder="Төлбөрийн дүн"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>


                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Нэмэх
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
                <Row gutter={[20, 20]} >
                    {
                        training.map((item, index) => (
                            <Col style={{ margin: 20 }} key={`lesson_${index}`} xl={6} xs={24} md={8}>
                                <Lesson data={item} userInfo={userInfo} />
                            </Col>
                        ))
                    }
                </Row>
            </Content>

        </Layout>
    )
}

export default Home