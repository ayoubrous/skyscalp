import React from 'react';
import { useTranslation } from "react-i18next";

// importing css 
import 'bootstrap/dist/css/bootstrap.css';
import './admin/assets/css/styles.min.css'
import './assets/style/default.css'
import './assets/style/style.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

const App = () => {
  const [t] = useTranslation()
  return (
    <Router>
      <Routes>
        <Route path='/' exact index element={<Home />} />
      </Routes>
    </Router>

  )
}

export default App;
