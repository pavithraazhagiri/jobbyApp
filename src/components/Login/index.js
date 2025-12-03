import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

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
      <div>
        <label htmlFor="usernameId">USERNAME</label>
        <br />
        <input
          type="text"
          placeholder="Username"
          id="usernameId"
          value={username}
          onChange={this.onChangeUsername}
        />
      </div>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <div>
        <label htmlFor="passwordId">PASSWORD</label>
        <br />
        <input
          type="password"
          placeholder="Password"
          id="passwordId"
          value={password}
          onChange={this.onChangePassword}
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
      <div>
        <form onSubmit={this.validate}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          {this.renderUsernameField()}
          {this.renderPasswordField()}
          <button type="submit">Login</button>
          <p>{errorMsg}</p>
        </form>
      </div>
    )
  }
}
export default Login
