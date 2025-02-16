import Home from "./pages/Home"
import Notes from "./pages/Notes"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ConfirmAccount from "./pages/ConfirmAccount"
import { AuthProvider } from "./context/AuthContext"
import { WorldMapProvider } from "./context/WorldMapContext"

import { BrowserRouter, Routes, Route } from "react-router-dom"
import PublicLayout from "./layout/PublicLayout"
import MainLayout from "./layout/MainLayout"



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

          </Routes>
          </WorldMapProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
