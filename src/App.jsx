import { useState } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import * as authService from './services/authService'
import './App.css'
import ClassList from './pages/ClassList/ClassList'
import ClassDetails from './pages/ClassDetails/ClassDetails'
import MonsterList from './pages/MonsterList/MonsterList'
import MonsterDetails from './pages/MonsterDetails/MonsterDetails'
import SpellSearch from './pages/SpellSearch/SpellSearch'
import SpellDetails from './pages/SpellDetails/SpellDetails'
import CreateChar from './pages/CreateChar/CreateChar'
import RaceList from './pages/RaceList/RaceList'
import RaceDetails from './pages/RaceDetails/RaceDetails'
import MyChars from './pages/MyChars/MyChars'
const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const navigate = useNavigate()

  const [navItems, setNavItems] = useState([
    {url: "/class-list", name: "Class List"}, 
    {url: "/race-list", name: "Race List"},
    {url: "/monster-list", name: "Scary Monsters"}, 
    {url: "/spell-search", name: "Search for Spells"},
    {url: "/create-char", name: "Create Character"},
    {url: "/MyCharaters", name: "My Charaters"}
  ])

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }

  return (
    <div className='basepic fixed'>
      <NavBar navItems={navItems} user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path='/class-list' element={<ClassList />} />
        <Route path='/class' element={<ClassDetails />} />
        <Route path='/monster-list' element={<MonsterList />} />
        <Route path='/monster' element={<MonsterDetails />} />
        <Route path='/spell-search' element={<SpellSearch />} />
        <Route path='/spell/:spellName' element={<SpellDetails />} />
        <Route path='/create-char' element={<CreateChar />} />
        <Route path='/race-list' element={<RaceList/>} />
        <Route path='/race' element={<RaceDetails/>} />
        <Route path="/" element={<Landing user={user} />} />
        <Route path="/signup" element={<Signup handleSignupOrLogin={handleSignupOrLogin} />} />
        <Route path="/login" element={<Login handleSignupOrLogin={handleSignupOrLogin} />} />
        <Route path="/profiles" element={user ? <Profiles /> : <Navigate to="/login" />} />
        <Route path="/changePassword" element={user ? <ChangePassword handleSignupOrLogin={handleSignupOrLogin}/> : <Navigate to="/login" />} />
        <Route path="/myCharaters" element={<MyChars />} />
      </Routes>
    </div>
  )
}

export default App
