import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/Home"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
