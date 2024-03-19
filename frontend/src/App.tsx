import Home from './components/Home'
import { Signin } from './components/auth/Login'
import { Register } from './components/auth/Register'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { NewUserScreen } from './components/newUser'
import { Header } from './components/Header'
import { Profile } from './components/userProfile'
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<NewUserScreen />} />
          <Route path="signin" element={<Signin />} />
          <Route path="register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App