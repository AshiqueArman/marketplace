import {Link, useLocation} from 'react-router-dom'
import './Navbar.css';


export default function Navbar() {

  const location = useLocation();


  const hiddenRoutes = ['/buy', '/changePWD'];

  const isHidden = hiddenRoutes.some(route => location.pathname === route);

  
  if (isHidden) {
    return null;
  }

  return (
    <nav className='navbar'>
      <Link to='/'>Home </Link>
      <Link to='/register'>Register </Link>
      <Link to='/login'>Login </Link>
      <Link to='/contact'>Contact</Link>
    </nav>
  )
}
