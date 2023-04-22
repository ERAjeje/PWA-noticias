import { memo } from "react";
import { Col, Row } from "antd";

function Home() {
  return <div>
    <Row gutter={[16, 16]}>
        <Col span={24}>
            <h1>PWA News</h1>
        </Col>
    </Row>
    <Row gutter={[16, 16]}>
        <Col span={24} md={16}>
            <h2>World</h2>
        </Col>
        <Col span={24} md={16}>
            <h2>Economy</h2>
        </Col>
    </Row>
    <hr />
    <Row gutter={[16, 16]}>
        <Col span={24} md={16}>
            <h2>Tecnology</h2>
        </Col>
    </Row>
  </div>;
}

export default memo(Home);