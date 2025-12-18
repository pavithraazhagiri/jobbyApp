import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
      />
      <h1 className="page-not-found-heading">Page Not Found</h1>
      <p className="page-not-found-description">
        we are sorry, the page you requested could not be found
      </p>
    </div>
  </div>
)
export default NotFound
