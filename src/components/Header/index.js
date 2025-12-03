import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const logout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <ul>
      <li>
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
      </li>
      <li>
        <Link to="/">
          <p>Home</p>
        </Link>
        <Link to="/jobs">
          <p>Jobs</p>
        </Link>
      </li>
      <li>
        <button type="button" onClick={logout}>
          Logout
        </button>
      </li>
    </ul>
  )
}

export default withRouter(Header)
