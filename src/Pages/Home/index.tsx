/* eslint-disable react-refresh/only-export-components */
import { memo, useEffect, useState } from "react";
import { Col, Row } from "antd";
import Economy from "./Components/Economy";
import { TArticle } from "../../Types/types";
import Api from "../../Services/newsService"
import Technology from "./Components/Technology";
import World from "./Components/World";

type AppState = {
    isLoading: boolean;
    news: {
      world: TArticle[],
      economy: TArticle[],
      technology: TArticle[]
    }
  }

function Home() {
    const [state, setState] = useState<AppState>({
        isLoading: false,
        news: {
            world: [],
            economy: [],
            technology: []
        }
    })

    const handleGetNews = (articles: PromiseSettledResult<any>[]) => {
        setState({ 
            news: {
            world: articles[0].status === "fulfilled" && articles[0].value,
            economy: articles[1].status === "fulfilled" && articles[1].value,
            technology: articles[2].status === "fulfilled" && articles[2].value
            }, 
            isLoading: false 
        });
        console.log('content', state.news.world[0].content)
    }

    useEffect(() => {
        setState({ ...state, isLoading: true });
        Promise.allSettled([
            Api.getNews('world'),
            Api.getNews('economy'),
            Api.getNews('technology')
        ]).then(articles => handleGetNews(articles))
    }, []);

  return <div>
    <Row gutter={[16, 16]}>
        <Col span={24}>
            <h1>PWA News</h1>
        </Col>
    </Row>
    <Row gutter={[16, 16]}>
        <Col span={24} md={16}>
            <h2>World</h2>
            <World values={state.news?.world} />
        </Col>
        <Col span={24} md={8}>
            <h2>Economy</h2>
            <Economy values={state.news?.economy} />
        </Col>
    </Row>
    <hr />
    <Row gutter={[16, 16]}>
        <Col span={24}>
            <h2>Tecnology</h2>
            <Technology values={state.news?.technology} />
        </Col>
    </Row>
  </div>;
}

export default memo(Home);