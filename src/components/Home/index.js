import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <div>
    <Header />
    <div className="home-bottom-container">
      <div className="home-heading-description-container">
        <h1 className="home-heading">Find The Job That Fits Your Life</h1>
        <p className="home-description">
          Millions of people are searching for jobs, salary information, company
          reviews.Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button type="button" className="find-jobs-button">
            Find Jobs
          </button>
        </Link>
      </div>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/home-lg-bg.png"
          alt="home"
          className="home-image"
        />
      </div>
    </div>
  </div>
)

export default Home
