/*
Copyright (C) 2025 Sthefany Angeles
Licensed under the Apache License, Version 2.0
See LICENSE file for details.
*/


import Home from "./pages/private/Home"
import Notes from "./pages/private/Notes"
import Login from "./pages/public/Login"
import Register from "./pages/public/Register"
import ConfirmAccount from "./pages/public/ConfirmAccount"
import { AuthProvider } from "./context/AuthContext"
import { WorldMapProvider } from "./context/WorldMapContext"

import { BrowserRouter, Routes, Route } from "react-router-dom"
import PublicLayout from "./layout/PublicLayout"
import MainLayout from "./layout/MainLayout"
import Profile from "./pages/private/Profile"



function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <WorldMapProvider>
          <Routes>
            <Route path="/" element={<PublicLayout />}>
              {<Route index element={<Login />} />}
              {<Route path="register" element={<Register />} />}
              {<Route path="confirm/:token" element={<ConfirmAccount />} />}
            </Route>

            <Route path="/worldmap" element={<MainLayout/>}>
              {<Route index element={<Home />} />}
              {<Route path="notes" element={<Notes />} />}
            </Route>
            <Route path="/worldmap/profile" element={<MainLayout/>}>
              {<Route index element={<Profile />} />}
              {<Route path="notes" element={<Notes />} />}
            </Route>


          </Routes>
          </WorldMapProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
