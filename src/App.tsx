import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from './Pages/Home'
import PostNews from './Pages/Noticia'
import Layout from './Layout'

function App() {

  return (
    <main>
      <section>
        <Router>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route path='/' element={<Home />} />
              <Route path='/:subject/:id' element={<PostNews />} />
            </Route>
          </Routes>
        </Router>
      </section>
    </main>
  )
}

export default App
