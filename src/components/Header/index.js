import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoMdHome} from 'react-icons/io'
import {IoBriefcase} from 'react-icons/io5'
import {RiLogoutBoxRLine} from 'react-icons/ri'
import './index.css'

const Header = props => {
  const logout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <ul className="header-container">
      <li>
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-jobby-image"
          />
        </Link>
      </li>
      <li className="home-jobs-container">
        <Link to="/" className="header-link">
          <p className="header-link-text">Home</p>
        </Link>
        <Link to="/jobs" className="header-link">
          <p className="header-link-text">Jobs</p>
        </Link>
      </li>
      <li>
        <button type="button" onClick={logout} className="logout-button">
          Logout
        </button>
      </li>
      <li className="header-icons-container">
        <Link to="/" className="header-link">
          <IoMdHome className="header-icon" />
        </Link>
        <Link to="/jobs" className="header-link">
          <IoBriefcase className="header-icon" />
        </Link>
        <RiLogoutBoxRLine onClick={logout} className="header-icon" />
      </li>
    </ul>
  )
}

export default withRouter(Header)
