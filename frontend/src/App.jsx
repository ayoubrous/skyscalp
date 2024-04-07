import React from 'react';

// importing css 
import 'bootstrap/dist/css/bootstrap.css';
import './admin/assets/css/styles.min.css'
import './assets/style/default.css'
import './assets/style/style.css'
import './assets/style/pages.css'
import './assets/style/media.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Properties from './pages/Properties';
import Machinery from './pages/Machinery';
import Construction from './pages/Construction';
import ScrollToTop from './components/utils/ScrollToTop';
import About from './pages/About';
import Contact from './pages/Contact';
import ViewBlog from './pages/ViewBlog';

const App = () => {
  return (
    <Router>
      <ScrollToTop >
        <Routes>
          <Route path='/' exact index element={<Home />} />
          <Route path='/about' exact element={<About />} />
          <Route path='/contact' exact element={<Contact />} />
          <Route path='/blog/:id' exact element={<ViewBlog />} />
          <Route path='/properties' exact element={<Properties />} />
          <Route path='/machinery' exact element={<Machinery />} />
          <Route path='/construction' exact element={<Construction />} />
        </Routes>
      </ScrollToTop>
    </Router>

  )
}

export default App;
