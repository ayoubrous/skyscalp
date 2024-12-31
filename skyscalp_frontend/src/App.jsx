import React, { useEffect } from 'react';

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
import ScrollToTop from './components/utils/ScrollToTop';
import About from './pages/About';
import Contact from './pages/Contact';
import ViewBlog from './pages/ViewBlog';
import ViewProperty from './pages/ViewProperty';
import ViewMachinery from './pages/ViewMachinery';
import ViewConstruction from './pages/ViewConstruction';
import ViewExpert from './pages/ViewExpert';


import Dashboard from './admin/pages/Dashboard';
import DashboardProperties from './admin/pages/Properties';
import DashboardMachinery from './admin/pages/Machinery';
import DashboardConstruction from './admin/pages/Construction';
import DashboardFurniture from './admin/pages/Furniture';
import DashboardMessages from './admin/pages/Messages';
import DashboardFavourites from './admin/pages/Favourites';
import AddProperty from './admin/pages/AddProperty';
import Login from './admin/pages/Login';
import Register from './admin/pages/Register';
import MarketPlace from './pages/MarketPlace';
import ViewFurniture from './pages/ViewFurniture';
import { AuthContextProvider } from './context/AuthContext';
import Private from './routes/Private';
import ForgotPasswordEmail from './admin/pages/ForgotPasswordEmail';
import UpdatePassword from './admin/pages/UpdatePassword';
import AdminExperts from './admin/pages/Experts';


import AdminDashboard from './admin/pages/owner/Dashboard';
import AdminLocations from './admin/pages/owner/Locations';
import AddMachinery from './admin/pages/AddMachinery';
import AddConstruction from './admin/pages/AddConstruction';
import AddFurniture from './admin/pages/AddFurniture';

import Users from './admin/pages/owner/Users';
import OwnerProperties from './admin/pages/owner/Properties';
import OwnerMaterials from './admin/pages/owner/Materials';
import Articles from './admin/pages/owner/Articles';
import OwnerMessages from './admin/pages/owner/Messages';
import AddArticle from './admin/pages/owner/AddArticle';
import OwnerExperts from './admin/pages/owner/Experts';


import UpdateAnalytics from './components/utils/UpdateAnalytics';
import AdminPrivate from './routes/AdminPrivate';
import { getLocations } from './assets/data/locations';
import Test from './Test';

import faviconLogo from './assets/images/logo-half.png'
import Experts from './pages/Experts';
import AddExpert from './admin/pages/AddExpert';

import ChatComponent from './components/utils/ChatComponent';


const App = () => {
  useEffect(() => {
    document.title = "Skyscalp"
    const favicon = document.querySelector('link[rel="icon"]');
    favicon.href = faviconLogo;
  }, [])

  let isExecuted = false
  useEffect(() => {
    function callAnalytics() {
      isExecuted = true
      UpdateAnalytics()
      getLocations()

    }
    if (!isExecuted) {
      callAnalytics()
    }
  }, [])
  return (
    <Router>
      <ScrollToTop >
        <AuthContextProvider>
          <div className='flex items-center justify-center h-screen'>
            <h1>
              Something wrong
            </h1>
          </div>
        </AuthContextProvider>
      </ScrollToTop>
    </Router>

  )
}

export default App;
