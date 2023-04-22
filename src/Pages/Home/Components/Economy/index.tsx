/* eslint-disable react-refresh/only-export-components */
import { useNavigate } from "react-router";
import { TArticle } from "../../../../Types/types";
import { Col, Row } from "antd";
import { memo } from "react";

function Economy({ values }: { values: TArticle[] }) {
    const history = useNavigate();

    const renderImage = (image: string, description: string) => <div><img src={image} alt={description} width={"100%"} /></div>

    const renderDescription = (description: string) => <p>{description}</p>

    const openNewsPost = (id: string | number) => history(`/economy/${id}`)

    const renderPost = (post: TArticle, index: number) => {
        const { title, image_url, description } =  post
        return (
            <Col span={24} md={12} key={`post-economy-${index}`}>
                <article onClick={() => openNewsPost(index)} style={{ cursor: 'pointer' }}>
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