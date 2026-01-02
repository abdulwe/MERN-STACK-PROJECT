
import React from 'react'

import {Routes,Route} from "react-router"
import HomePage from "./Pages/HomePage.jsx"
import CreatePage from "./Pages/CreatePage.jsx"
import NoteDetailPage from "./Pages/NoteDetailPage.jsx"
import SignupForm from './Pages/Signup.jsx';
import SigninForm from "./Pages/Signin.jsx";
import { Navigate } from 'react-router'
import VerifyOtp from './Pages/VerifyOtp.jsx'

function App() {
  const token = localStorage.getItem("token");
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
      
      <Routes>
        

          <Route
            path="/"
            element={token ? <HomePage /> : <Navigate to="/signup" replace />}
          />

          <Route path="/signup" element={<SignupForm />} />
          <Route path="/signin" element={<SigninForm />} />
          <Route path='/VerifyOtp' element={<VerifyOtp />} />
          <Route path="/create" element={<CreatePage/>}/>
          <Route path="/note/:id" element={<NoteDetailPage/>}/>
      </Routes>
    </div>
  )
}

export default App
