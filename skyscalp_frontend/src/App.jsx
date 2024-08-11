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


import UpdateAnalytics from './components/utils/UpdateAnalytics';
import AdminPrivate from './routes/AdminPrivate';
import { getLocations } from './assets/data/locations';

const App = () => {

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
          <Routes>
            <Route path='/' exact index element={<Home />} />
            <Route path='/about' exact element={<About />} />
            <Route path='/estimate' exact element={<Contact />} />
            <Route path='/article/:id' exact element={<ViewBlog />} />
            {/* ----- Listing pages -----  */}
            <Route path='/properties' exact element={<Properties />} />
            <Route path='/marketplace' exact element={<MarketPlace />} />
            {/* ------ Detailed Pages -------  */}
            <Route path='/property/:id' exact element={<ViewProperty />} />
            <Route path='/construction/:id' exact element={<ViewConstruction />} />
            <Route path='/machinery/:id' exact element={<ViewMachinery />} />
            <Route path='/furniture/:id' exact element={<ViewFurniture />} />


            <Route path='/register' exact element={<Register />} />
            <Route path='/login' exact element={<Login />} />
            <Route path='/forgot-password' exact element={<ForgotPasswordEmail />} />
            <Route path='/update-password' exact element={<UpdatePassword />} />

            <Route element={<Private />}>
              {/* ------ OWNER ---------  */}
              <Route element={<AdminPrivate />}>
                <Route path='/admin/dashboard' exact element={<AdminDashboard />} />
                <Route path='/admin/locations' exact element={<AdminLocations />} />
                <Route path='/admin/users' exact element={<Users />} />
                <Route path='/admin/properties' exact element={<OwnerProperties />} />
                <Route path='/admin/materials' exact element={<OwnerMaterials />} />
                <Route path='/admin/articles' exact element={<Articles />} />
                <Route path='/admin/add-article' exact element={<AddArticle />} />
                <Route path='/admin/update-article/:id' exact element={<AddArticle />} />
                <Route path='/admin/messages' exact element={<OwnerMessages />} />
              </Route>

              <Route path='/app/dashboard' exact element={<Dashboard />} />
              <Route path='/app/properties' exact element={<DashboardProperties />} />
              <Route path='/app/machinery' exact element={<DashboardMachinery />} />
              <Route path='/app/construction' exact element={<DashboardConstruction />} />
              <Route path='/app/furniture' exact element={<DashboardFurniture />} />
              <Route path='/app/favourites' exact element={<DashboardFavourites />} />
              <Route path='/app/messages' exact element={<DashboardMessages />} />
              <Route path='/app/add-property' exact element={<AddProperty />} />
              <Route path='/app/update-property/:id' exact element={<AddProperty />} />
              <Route path='/app/add-machinery' exact element={<AddMachinery />} />
              <Route path='/app/update-machinery/:id' exact element={<AddMachinery />} />
              <Route path='/app/add-construction' exact element={<AddConstruction />} />
              <Route path='/app/update-construction/:id' exact element={<AddConstruction />} />
              <Route path='/app/add-furniture' exact element={<AddFurniture />} />
              <Route path='/app/update-furniture/:id' exact element={<AddFurniture />} />
            </Route>


          </Routes>
        </AuthContextProvider>
      </ScrollToTop>
    </Router>

  )
}

export default App;
