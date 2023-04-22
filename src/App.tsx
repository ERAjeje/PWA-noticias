import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from './Pages/Home'
import PostNews from './Pages/Noticia'

function App() {

  return (
    <main>
      <section>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/:subject/:id' element={<PostNews />} />
          </Routes>
        </Router>
      </section>
    </main>
  )
}

export default App
