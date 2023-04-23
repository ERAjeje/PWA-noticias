/* eslint-disable react-refresh/only-export-components */
import { useNavigate } from "react-router";
import { TArticle } from "../../../../Types/types";
import { Col, Row } from "antd";
import { memo } from "react";
import { renderDescription, renderImage } from "../../../../Utils";

function Economy({ values }: { values: TArticle[] }) {
    const history = useNavigate();

    const openNewsPost = (id: string | undefined) => history(`/economy/${id}`)

    const renderPost = (post: TArticle) => {
        const { title, image_url, description } =  post
        return (
            <Col span={24} md={12} key={`post-economy-${post.id}`}>
                <article onClick={() => openNewsPost(post.id)} style={{ cursor: 'pointer' }}>
                    <p><strong>{title}</strong></p>
                    {image_url && renderImage(image_url, description) || renderDescription(description)}
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

export default memo(Economy);