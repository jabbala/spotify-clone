import './App.css'

import {Route, Routes} from 'react-router-dom'
import HomePage from './pages/home/HomePage.js'
import AuthCallbackPage from './pages/auth-callback/AuthCallbackPage.js'

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth-callback" element={<AuthCallbackPage />} />
      </Routes>
    </>
  )
}

export default App
