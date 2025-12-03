import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <div>
    <Header />
    <div>
      <div>
        <h1>Find The Job That Fits Your Life</h1>
        <p>
          Millions of people are searching for jobs, salary information, company
          reviews.Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button type="button">Find Jobs</button>
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
