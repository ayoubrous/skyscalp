import React from 'react';

// importing css 
import 'bootstrap/dist/css/bootstrap.css';
import './admin/assets/css/styles.min.css'
import './assets/style/default.css'
import './assets/style/style.css'
import './assets/style/pages.css'
import './assets/style/filters.css'
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
import ViewProperty from './pages/ViewProperty';
import ViewMachinery from './pages/ViewMachinery';
import ViewConstruction from './pages/ViewConstruction';


import Dashboard from './admin/pages/Dashboard';
import DashboardProperties from './admin/pages/Properties';

const App = () => {
  return (
    <Router>
      <ScrollToTop >
        <Routes>
          <Route path='/' exact index element={<Home />} />
          <Route path='/about' exact element={<About />} />
          <Route path='/contact' exact element={<Contact />} />
          <Route path='/blog/:id' exact element={<ViewBlog />} />
          {/* ----- Listing pages -----  */}
          <Route path='/properties' exact element={<Properties />} />
          <Route path='/machinery' exact element={<Machinery />} />
          <Route path='/construction' exact element={<Construction />} />
          {/* ------ Detailed Pages -------  */}
          <Route path='/property/:id' exact element={<ViewProperty />} />
          <Route path='/construction/:id' exact element={<ViewConstruction />} />
          <Route path='/machinery/:id' exact element={<ViewMachinery />} />


          <Route path='/app/dashboard' exact element={<Dashboard />} />
          <Route path='/app/properties' exact element={<DashboardProperties />} />

        </Routes>
      </ScrollToTop>
    </Router>

  )
}

export default App;
