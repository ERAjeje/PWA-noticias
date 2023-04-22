import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from './Pages/Home'
import { useEffect, useState } from 'react'
import Api from './Services/newsService'

type Article = {
  "title": string,
  "link": string,
  "keywords": string | null,
  "creator": string[],
  "video_url": string | null,
  "description": string,
  "content": string,
  "pubDate": string,
  "image_url": string | null,
  "source_id": string,
  "category": string[],
  "country": string[],
  "language": string,
}

type AppState = {
  isLoading: boolean;
  news: {
    world: Article[],
    economy: Article[],
    technology: Article[]
  }
}

function App() {
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

  return (
    <main>
      <section>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </Router>
      </section>
    </main>
  )
}

export default App
