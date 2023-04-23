/* eslint-disable react-refresh/only-export-components */
import { useNavigate } from "react-router";
import { TArticle } from "../../../../Types/types";
import { Col, Row } from "antd";
import { memo } from "react";
import { renderDescription, renderImage } from "../../../../Utils";

function Technology({ values }: { values: TArticle[] }) {
    const history = useNavigate();

    const openNewsPost = (id: string | undefined) => history(`/technology/${id}`)

    const renderPost = (post: TArticle) => {
        const { title, image_url, description } =  post
        return (
            <Col span={12} md={6} key={`post-technology-${post.id}`}>
                <article onClick={() => openNewsPost(post.id)} style={{ cursor: 'pointer' }}>
                    <p><strong>{title}</strong></p>
                    {renderDescription(description)}
                    {image_url && renderImage(image_url, description)}
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

export default memo(Technology);