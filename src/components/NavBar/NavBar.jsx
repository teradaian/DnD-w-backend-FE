import { Link } from 'react-router-dom'

const NavBar = ({ user, handleLogout, navItems }) => {
  const handleClassChange = (e) => {
    if (e.target.value ==='Profiles') { 
    <Link to="/profiles"></Link>
    }
    if (e.target.value ==='LOG OUT') {
      handleLogout()
    }
    if(e.target.value ==='Change Password'){
      <Link to="/changePassword"></Link>
    }
  }
  return (
    <>
      {user ?
        <nav className="App-header">
          <ul>
            <img 
              src="/images/dndlogo.png" 
              alt="logo" 
              className="App-logo"
              style={{ width: "100px", height: "100px" }}
            />
            {navItems.map((navItem, idx) =>
              <a key={idx} href={navItem.url}>{navItem.name}</a>
            )}
            <li>Welcome, {user.name}</li>
            <select onChange={ value =>  handleClassChange(value) } name="navDropDown" id="navDropDown">
              <option value='Profile'>Profiles</option>
              <option value='LOG OUT'>LOG OUT</option>
              <option value='Change Password'>Change Password</option>
            </select>
          </ul>
        </nav>
      :
        <nav className="App-header">
          <ul>
            <li><Link to="/login">Log In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </ul>
        </nav>
      }
    </>
  )
}

export default NavBar
