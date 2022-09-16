import './Header.css'
import logo from '../../assets/logo.png'
const Header = () => {
  return (
    <div className='headerContainer'>
      <img src={logo} alt="Logo" className='logo' />
      <h1 className='heading'>
        Stack Overflow Questions</h1>
    </div>
  )
}

export default Header
