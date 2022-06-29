import { Button, Card, Col, Form, Input, Modal, Row, Space, Table, Tag, Typography } from 'antd';
import React, { useState } from 'react';
import UserService from '../../services/UserService';
import './style.css';
const { Title, Text, } = Typography;
const lessons = [{
    id: 1,
    name: 'A.Hel',
    level: 'Anhan',
    startDate: '2021-12-12',
    startDate: '2021.02.12',
    teacher: {},

}, {
    id: 2,
    name: 'A.Hel',
    level: 'Dund',
    startDate: '2021-12-12',
    startDate: '2021.02.12',
    teacher: {},
}, {
    id: 3,
    name: 'A.Hel',
    level: 'Ahisn',
    startDate: '2021-12-12',
    startDate: '2021.02.12',
    teacher: {},
}];
const columns = [
    {
        title: 'Гараг',
        dataIndex: 'day',
        key: 'day',
    },
    {
        title: 'Цаг ',
        dataIndex: 'time',
        key: 'time',
    },
];
const data = [
    {
        key: '1',
        day: 'Даваа',
        time: '11:00 - 13:00',
    },
    {
        key: '2',
        day: 'Лхагва',
        time: '11:00 - 13:00',

    },
    {
        key: '3',
        day: 'Баасан',
        time: '13:00 - 14:00',
    },
];
const LessonDetail = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <div className='details'>
            <Card>
                <Title level={3}>Англи нэр</Title>
                <Space direction="vertical">
                    <Text>
                        <b>
                            Энэхүү сургалт нь бүх насныханд зориулсан Англиар өдөр бүр унших, сонсох, хэлэх дадал хэвшүүлэх зорилготой.
                            Хүүхэд хэлд орохтой адил байгалиараа хэл сурах аргыг сургалтандаа үр дүнтэйгээр ашигласнаараа илүү онцлог болсон.
                        </b>
                        <br />
                        Энэхүү сургалтаар дүрэм үзэхгүй, ердөө л өдөр бүр хялбар богино үлгэр, эхүүдийг багштайгаа хамт уншиж ойлгох, даган дуурайн хэлж дуудлагаа засах, сонсож ойлгох үйлдлүүдийг хийлгэж дадал хэвшүүлэх юм.<br />

                        Сургалтаа үзэж эзэмшсэнээр та :<br />
                        - Төрөл бүрийн түүхийг уншиж, сонсч чихээ онгойлгоно<br />
                        - Багшийгаа даган дуурайж хэлэн хэлээ зүгшрүүлнэ<br />
                        - Үгсийн сангаа нэмэгдүүлж, өгүүлбэрийг ойлгож орчуулах чадвараа ихээр нэмэгдүүлэх болно.<br />

                        Сургалтан дээрээ уулзацгаая!
                    </Text>
                    <Text>
                        Англиар унших, сонсох дадлыг хэвшүүлэх сургалт
                    </Text>
                    <Text>
                        <b>Багш:</b> Одгэрэл
                    </Text>
                    <Row gutter={[20, 20]} >
                        <Col xl={6} xs={24} md={8}>
                            Төлөв:
                        </Col>
                        <Col xl={6} xs={24} md={8}>
                            Эхлэх хугацаа:
                        </Col>
                    </Row>
                </Space>
                <Text>
                    Хичээлийн хуваарь
                </Text>
                <Table columns={columns} dataSource={data} />
                <Button type="primary"onClick={showModal} >Бүртгүүлэх</Button>
                <Modal title="Бүртгүүлэх цонх" visible={isModalVisible} footer={null} onCancel={handleCancel}>
                    
                </Modal>
            </Card>
        </div>
    )
}

export default LessonDetail