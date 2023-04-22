/* eslint-disable react-refresh/only-export-components */
import { useNavigate } from "react-router";
import { TArticle } from "../../../../Types/types";
import { Col, Row } from "antd";
import { memo } from "react";
import { renderDescription, renderImage } from "../utils";

function World({ values }: { values: TArticle[] }) {
    const history = useNavigate();

    const openNewsPost = (id: string | number) => history(`/world/${id}`)

    const renderPost = (post: TArticle, index: number) => {
        const { title, image_url, description } =  post
        const isFirstImage = index === 0;
        const spanValue = isFirstImage && 24 || 12;

        return (
            <Col span={spanValue} key={`post-world-${index}`}>
                <article onClick={() => openNewsPost(index)} style={{ cursor: 'pointer' }}>
                    <p><strong>{title}</strong></p>
                    {renderDescription(description)}
                    {isFirstImage && image_url && renderImage(image_url, description)}
                </article>
            </Col>
        );
    }

    return (
        <Row gutter={[16, 16]}>
            {values?.map(renderPost)}
        </Row>
    );
}

export default memo(World);