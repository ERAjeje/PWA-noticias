/* eslint-disable react-refresh/only-export-components */
import { memo, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { TAppState, TArticle, TSubject } from "../../Types/types";
import Api from '../../Services/newsService';
import { Col, Row } from "antd";
import { renderDescription, renderImage } from "../../Utils";

interface PostNewsState extends TAppState {
    post: TArticle | undefined
}

function PostNews() {
    const history = useNavigate();
    const { id, subject } = useParams();

    const [state, setState] = useState<PostNewsState>({
        isLoading: false,
        news: {
          world: [],
          economy: [],
          technology: []
        },
        post: undefined
      });

    const handleNews = useCallback((data: PromiseSettledResult<any>[]) => {
        setState(state => ({
            ...state,
            news: {
                ...state.news,
                world: subject === 'world' && data[0].status === 'fulfilled' && data[0].value || [],
                economy: subject === 'economy' && data[0].status === 'fulfilled' && data[0].value || [],
                technology: subject === 'technology' && data[0].status === 'fulfilled' && data[0].value || [],
            },
            post: data[1].status === 'fulfilled' && data[1].value,
            isLoading: false
        }))
    }, [])

    const openNewsPost = (id: string | undefined) => history(`/${subject}/${id}`);

    const renderPost = (post: TArticle) => {
        const { title, image_url, description } =  post

        return (
            <Col span={12} key={`post-${subject}-${post.id}`}>
                <article onClick={() => openNewsPost(post.id)} style={{ cursor: 'pointer' }}>
                    <p><strong>{title}</strong></p>
                    {image_url && renderImage(image_url, description) || renderDescription(description)}
                </article>
            </Col>
        );
    }

    useEffect(() => {
        setState({ ...state, isLoading: true });
        Promise.allSettled([
            Api.getNews(subject as TSubject),
            Api.getNewsById(subject as TSubject, id as string)
        ]).then(handleNews)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, subject, handleNews])

    if(state.isLoading) return <div>Carregando...</div>
    
    return (
        <div>
            <Row gutter={[16, 16]}>
                <Col span={24} md={16}>
                    <p>{state.post?.pubDate}</p>
                    <h1>{state.post?.title}</h1>
                    {state.post?.image_url && renderImage(state.post?.image_url, state.post?.description)}
                    <p className="text" >{state.post?.description}</p>
                    <hr />
                    <p className="text">{state.post?.content}</p>
                </Col>
                <Col span={24} md={8}>
                    <Row gutter={[16, 16]}>
                        {state.news?.[`${subject as TSubject}`].filter((item: TArticle) => item.id !== id)
                            .map(renderPost)}
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default memo(PostNews)