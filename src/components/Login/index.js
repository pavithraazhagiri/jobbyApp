import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <div className="username-container">
        <label htmlFor="usernameId" className="username-label">
          USERNAME
        </label>
        <br />
        <input
          type="text"
          placeholder="Username"
          id="usernameId"
          value={username}
          onChange={this.onChangeUsername}
          className="username-input"
        />
      </div>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <div className="username-container">
        <label htmlFor="passwordId" className="username-label">
          PASSWORD
        </label>
        <br />
        <input
          type="password"
          placeholder="Password"
          id="passwordId"
          value={password}
          onChange={this.onChangePassword}
          className="username-input"
        />
      </div>
    )
  }

  validate = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const loginCredentials = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(loginCredentials),
    }
    const response = await fetch(url, options)
    const responseData = await response.json()
    if (response.ok === true) {
      const jwtToken = responseData.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 3})
      const {history} = this.props
      history.replace('/')
    } else {
      const errorMsg = responseData.error_msg
      this.setState({errorMsg})
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {errorMsg} = this.state
    return (
      <div className="login-container">
        <form onSubmit={this.validate} className="form-container">
          <div className="login-image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="login-image"
            />
          </div>
          <div className="login-fields-container">
            {this.renderUsernameField()}
            {this.renderPasswordField()}
            <button type="submit" className="login-button">
              Login
            </button>
            <p className="login-errormsg">{errorMsg}</p>
          </div>
        </form>
      </div>
    )
  }
}
export default Login
