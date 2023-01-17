import React from 'react'
import './App.css'
//Below are a few react-router-dom components that provide our routing functionality.
// 1) BrowserRouter - Router for the app (we must place the Navigation and Routes inside these tags.)
// 2) Routes - kind of like a switch - details all the Route components inside.
// 3) Route - for every route in our app we will have a Route component listed below. This gives instructions
//to the app for what component to display based on the path url
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Bootstrap from './components/Bootstrap/Bootstrap'
import Navigation from './components/Navigation'
import NotFound from './components/NotFound'
import AuthProvider from './contexts/AuthContext'
import Login from './components/Auth/Login'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import ToDos from './components/ToDos/ToDos'
import Categories from './components/Categories/Categories'

export default function App() {
  return (
    <div className='App'>
      
      {/* The below component is actually calling the BrowserRouter, but we made an alias in the import. We surround
      the Navigation beacause it has Link components called react-router-dom package and rendered in that component.
      Per the docs on their site, link, routes and the route need to be rendered inside the Router */}
      <AuthProvider>
        <Router>
          <Navigation />
          <Routes>
            <Route path='/' element={<ProtectedRoute><Bootstrap/></ProtectedRoute>} />
            <Route path='/login' element={<Login />} />
            <Route path='/bootstrap' element={<Bootstrap/>} />
            <Route path='/todos' element={<ToDos/>} />
            <Route path='/categories' element={<Categories/>} />

            {/* The NotFound component will be an error handler (page showing a nice message) and will be tied to any
            other Route than what is detailed above. All routes listed above this Route will have very specific paths
            that are listed for them. The Route below will be a catch-all for the rest of what could be in the path. */}
            <Route path='*' element={<NotFound/>} />
          </Routes>
          <Footer /> 
        </Router>
      </AuthProvider>

    </div>
  )
}
