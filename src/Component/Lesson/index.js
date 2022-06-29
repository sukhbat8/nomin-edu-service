import { Button, Card, Form, Input, message, Modal, Select, Space, Table, Typography } from 'antd'
import React, { useState } from 'react'
import moment from "moment";
import TimeService from '../../services/TimeService';
const { Title, Text } = Typography;
const { Option } = Select;
const columns = [
    {
        title: 'Даваа',
        dataIndex: 'даваа',
        key: 'даваа',
        render: (text) => {
            return <div>
                <Form.Item name="monday" value={1} >
                    <Select style={{ width: 130 }} >
                        <Option value="10:00 - 11:30">10:00 - 11:30</Option>
                        <Option value="13:40 - 13:10">13:40 - 13:10</Option>
                        <Option value="13:40 - 15:10">13:40 - 15:10</Option>
                        <Option value="15:20 - 16:40">15:20 - 16:40</Option>
                        <Option value="18:20 - 19:50">18:20 - 19:50</Option>
                    </Select>
                </Form.Item>
            </div>
        }
    },
    {
        title: 'Мягмар',
        dataIndex: 'мягмар',
        key: 'мягмар',
        render: (text) => {
            return <div>
                <Form.Item name="tuesday" >
                    <Select style={{ width: 130 }} >
                        <Option value="10:00 - 11:30">10:00 - 11:30</Option>
                        <Option value="13:40 - 13:10">13:40 - 13:10</Option>
                        <Option value="13:40 - 15:10">13:40 - 15:10</Option>
                        <Option value="15:20 - 16:40">15:20 - 16:40</Option>
                        <Option value="18:20 - 19:50">18:20 - 19:50</Option>
                    </Select>
                </Form.Item>
            </div>
        }

    },
    {
        title: 'Лхагва',
        dataIndex: 'лхагва',
        key: 'лхагва',
        render: (text) => {
            return <div>
                <Form.Item name="wednesday" >
                    <Select style={{ width: 130 }} >
                        <Option value="10:00 - 11:30">10:00 - 11:30</Option>
                        <Option value="13:40 - 13:10">13:40 - 13:10</Option>
                        <Option value="13:40 - 15:10">13:40 - 15:10</Option>
                        <Option value="15:20 - 16:40">15:20 - 16:40</Option>
                        <Option value="18:20 - 19:50">18:20 - 19:50</Option>
                    </Select>
                </Form.Item>
            </div>
        }
    },
    {
        title: 'Пүрэв',
        dataIndex: 'пүрэв',
        key: 'пүрэв',
        render: (text) => {
            return <div>
                <Form.Item name="thursday" >
                    <Select style={{ width: 130 }} >
                        <Option value="10:00 - 11:30">10:00 - 11:30</Option>
                        <Option value="13:40 - 13:10">13:40 - 13:10</Option>
                        <Option value="13:40 - 15:10">13:40 - 15:10</Option>
                        <Option value="15:20 - 16:40">15:20 - 16:40</Option>
                        <Option value="18:20 - 19:50">18:20 - 19:50</Option>
                    </Select>
                </Form.Item>
            </div>
        }
    },
    {
        title: 'Баасан',
        dataIndex: 'баасан',
        key: 'баасан',
        render: (text) => {
            return <div>
                <Form.Item name="friday" >
                    <Select style={{ width: 130 }} >
                        <Option value="10:00 - 11:30">10:00 - 11:30</Option>
                        <Option value="13:40 - 13:10">13:40 - 13:10</Option>
                        <Option value="13:40 - 15:10">13:40 - 15:10</Option>
                        <Option value="15:20 - 16:40">15:20 - 16:40</Option>
                        <Option value="18:20 - 19:50">18:20 - 19:50</Option>
                    </Select>
                </Form.Item>
            </div>
        }
    },
];
const dataSource = [
    {
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
    }
]
function Lesson(props) {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const trainingButton = () => {
        switch (props.userInfo?.type) {
            case "1":
                return teacherButton();
            case "2":
                return managerButton();
            case "3":
                return studentButton();
            default:
                return null;
        }
    }

    const teacherButton = () => {
        return null;
    }
    const studentButton = () => {
        switch (props.data?.status) {
            case 'Бүртгэл эхэлсэн':
                return <div>
                    <Button type="primary" >Бүртгүүлэх</Button>
                </div>
            default:
                return null;
        }
    }
    const onFinish = (values) => {
        TimeService.saveCalendar({
            ...values,
            startDate: moment(props.data.startDate).format('YYYY-MM-DD'),
            endDate: moment(props.data.endDate).format('YYYY-MM-DD'),
            training_id: props.data._id
        }).then((res) => {
            if (res.code == 200) {
                closeModal();
                message.success('Хуваарь амжилттай хадгалагдлаа!');
            }
        })
    };
    const register = () => {
        TimeService.saveRegister({
            training_id: props.data._id
        }).then((res) => {
            if (res.code == 200) {
                closeModal();
                message.success('Амжилттай элсэлт авч эхэллээ!');
            }
        })
    };
    const showModal = () => {
        setIsModalVisible(true);
    };
    const closeModal = () => {
        setIsModalVisible(false);
    };


    const managerButton = () => {
        switch (props.data?.status) {
            case 'Үүссэн':
                return <div>
                    <Button onClick={showModal} type="primary">Хуваарь оруулах</Button>
                    <Modal title="Хичээлийн хуваарь оруулах" width={900} visible={isModalVisible} onCancel={closeModal} footer={null}>
                        <Form
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Table dataSource={dataSource} columns={columns} />
                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            case 'Хуваарь оруулсан':
                return <div>
                    <Button type="primary" onClick={register} >Элсэлт авах</Button>
                </div>
            case 'Бүртгэл эхэлсэн':
                return <div>
                    <Button type="primary" >Бүртгэл хаах</Button>
                </div>
            default:
                return null;
        }
        return null;

    };
    return (
        <Card>
            <Title level={3}>{`${props.data.lesson_id.name}/${props.data.level_id.name}`}</Title>
            <Space direction="vertical">
                <Text>
                    Эхлэх огноо: {moment(props.data?.startDate).format('DD-MM-YYYY')}
                </Text>
                <Text>
                    Дуусах огноо: {moment(props.data?.endDate).format('DD-MM-YYYY')}
                </Text>
                <Text>
                    Анги дүүргэлт: {props.data.studentCount}/60
                </Text>
                <Text>
                    Төлбөр: {props.data.payment}₮
                </Text>
                {
                    trainingButton()
                }
            </Space>

        </Card>
    )
}

export default Lesson