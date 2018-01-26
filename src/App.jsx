import React from 'react'
import { renderRoutes } from 'react-router-config'
import { HashRouter as Router } from 'react-router-dom'
import routes from 'routes'
import logo from './assets/logo.svg'
import './App.css'


const App = () => (
  <div className='App'>
    <div className='App-header'>
      <img src={logo} className='App-logo shake-rotate' alt='logo' />
    </div>
    <Router>
      {renderRoutes(routes)}
    </Router>
  </div>
)

export default App
