import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Profile from '../Profile'
import JobItem from '../JobItem'
import FailureView from '../FailureView'
import './index.css'

const viewsConstants = {
  loadingView: 'LOADING',
  successView: 'SUCCESS',
  jobsfailureView: 'JOBS FAILURE',
  profilefailureView: 'PROFILE FAILURE',
  noJobsView: 'NO JOBS',
  initialView: 'INITIAL',
}
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]
const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
const employmentTypeFilter = []

class Jobs extends Component {
  state = {
    profileDetails: {profileImageUrl: '', name: '', shortBio: ''},
    employmentTypeFilterString: '',
    salaryFilterString: '',
    searchInputString: '',
    jobDetailsList: [],
    view: viewsConstants.initialView,
    profileView: viewsConstants.initialView,
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobDetails()
  }

  getProfileDetails = async () => {
    this.setState({profileView: viewsConstants.loadingView})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const responseData = await response.json()
      const profileDetails = responseData.profile_details
      const profileImageUrl = profileDetails.profile_image_url
      const {name} = profileDetails
      const shortBio = profileDetails.short_bio
      this.setState({
        profileDetails: {profileImageUrl, name, shortBio},
        profileView: viewsConstants.successView,
      })
    } else {
      this.setState({profileView: viewsConstants.profilefailureView})
    }
  }

  getJobDetails = async () => {
    this.setState({view: viewsConstants.loadingView})
    const jwtToken = Cookies.get('jwt_token')
    const {employmentTypeFilterString, salaryFilterString} = this.state
    const {searchInputString} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeFilterString}&minimum_package=${salaryFilterString}&search=${searchInputString}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const responseData = await response.json()
      const {jobs, total} = responseData
      const jobDetailsList = jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      console.log(responseData)
      if (total > 0) {
        this.setState({jobDetailsList, view: viewsConstants.successView})
      } else {
        this.setState({view: viewsConstants.noJobsView})
      }
    } else {
      this.setState({view: viewsConstants.jobsfailureView})
    }
  }

  onChangeEmploymentFilter = event => {
    if (event.target.checked) {
      employmentTypeFilter.push(event.target.value)
    } else {
      const index = employmentTypeFilter.indexOf(event.target.value)
      employmentTypeFilter.splice(index, 1)
    }
    const employmentTypeFilterString = employmentTypeFilter.join(',')
    console.log(employmentTypeFilterString)
    this.setState({employmentTypeFilterString}, this.getJobDetails)
  }

  onChangeSalary = event => {
    const salaryFilterString = event.target.value
    this.setState({salaryFilterString}, this.getJobDetails)
  }

  onChangeSearchInput = event => {
    this.setState({searchInputString: event.target.value})
  }

  onRetry = () => {
    this.getJobDetails()
  }

  onProfileRetry = () => {
    console.log('retry')
    this.getProfileDetails()
  }

  renderEmploymentSearchPanel = () => (
    <div>
      <h1>Type of Employment</h1>
      <ul>
        {employmentTypesList.map(eachObj => (
          <li key={eachObj.employmentTypeId}>
            <input
              type="checkbox"
              id={eachObj.employmentTypeId}
              value={eachObj.employmentTypeId}
              onChange={this.onChangeEmploymentFilter}
            />
            <label htmlFor={eachObj.employmentTypeId}>{eachObj.label}</label>
          </li>
        ))}
      </ul>
    </div>
  )

  renderSalaryRangeSearchPanel = () => (
    <div>
      <h1>Salary Range</h1>
      <ul>
        {salaryRangesList.map(eachSalaryObj => (
          <li key={eachSalaryObj.salaryRangeId}>
            <input
              type="radio"
              id={eachSalaryObj.salaryRangeId}
              name="salary"
              onChange={this.onChangeSalary}
              value={eachSalaryObj.salaryRangeId}
            />
            <label htmlFor={eachSalaryObj.salaryRangeId}>
              {eachSalaryObj.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  renderSearchInputPanel = () => {
    const {searchInputString} = this.state
    return (
      <div>
        <input
          type="search"
          placeholder="Search"
          value={searchInputString}
          onChange={this.onChangeSearchInput}
          id="search"
        />
        <button
          type="button"
          data-testid="searchButton"
          onClick={this.getJobDetails}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  getProfileContent = () => {
    const {profileDetails, profileView} = this.state
    let profileContent
    switch (profileView) {
      case viewsConstants.loadingView:
        profileContent = (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="black" height="50" width="50" />
          </div>
        )
        break
      case viewsConstants.successView:
        profileContent = <Profile profileDetails={profileDetails} />
        break
      case viewsConstants.profilefailureView:
        profileContent = (
          <button
            type="button"
            onClick={this.onProfileRetry}
            data-testid="profileRetryButton"
          >
            Retry
          </button>
        )
        break
      default:
        return null
    }
    return profileContent
  }

  renderLoadingView = () => (
    <div>
      <Header />
      <div className="jobs-bottom-container">
        <div>
          {this.getProfileContent()}
          <hr />
          {this.renderEmploymentSearchPanel()}
          <hr />
          {this.renderSalaryRangeSearchPanel()}
        </div>
        <div>
          {this.renderSearchInputPanel()}
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="black" height="50" width="50" />
          </div>
        </div>
      </div>
    </div>
  )

  renderSuccessView = () => {
    const {jobDetailsList} = this.state
    return (
      <div>
        <Header />
        <div className="jobs-bottom-container">
          <div>
            {this.getProfileContent()}
            <hr />
            {this.renderEmploymentSearchPanel()}
            <hr />
            {this.renderSalaryRangeSearchPanel()}
          </div>
          <ul>
            {this.renderSearchInputPanel()}
            {jobDetailsList.map(eachJob => (
              <JobItem details={eachJob} key={eachJob.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderJobsFailureView = () => (
    <div>
      <Header />
      <div className="jobs-bottom-container">
        <div>
          {this.getProfileContent()}
          <hr />
          {this.renderEmploymentSearchPanel()}
          <hr />
          {this.renderSalaryRangeSearchPanel()}
        </div>
        <div>
          {this.renderSearchInputPanel()}
          <FailureView onRetry={this.onRetry} />
        </div>
      </div>
    </div>
  )

  renderProfileFailureView = () => {
    const {jobDetailsList} = this.state
    return (
      <div>
        <Header />
        <div className="jobs-bottom-container">
          <div>
            <button
              type="button"
              onClick={this.onProfileRetry}
              data-testid="profileRetryButton"
            >
              Retry
            </button>
            <hr />
            {this.renderEmploymentSearchPanel()}
            <hr />
            {this.renderSalaryRangeSearchPanel()}
          </div>
          <div>
            {this.renderSearchInputPanel()}
            {jobDetailsList.map(eachJob => (
              <JobItem details={eachJob} key={eachJob.id} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  rendernoJobsView = () => {
    const {profileDetails} = this.state
    return (
      <div>
        <Header />
        <div className="jobs-bottom-container">
          <div>
            <Profile profileDetails={profileDetails} />
            <hr />
            {this.renderEmploymentSearchPanel()}
            <hr />
            {this.renderSalaryRangeSearchPanel()}
          </div>
          <div>
            {this.renderSearchInputPanel()}
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                alt="no jobs"
              />
              <h1>No Jobs Found</h1>
              <p>We could not find any jobs. Try other filters</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {view} = this.state
    switch (view) {
      case viewsConstants.loadingView:
        return this.renderLoadingView()
      case viewsConstants.successView:
        return this.renderSuccessView()
      case viewsConstants.jobsfailureView:
        return this.renderJobsFailureView()
      case viewsConstants.profilefailureView:
        return this.renderProfileFailureView()
      case viewsConstants.noJobsView:
        return this.rendernoJobsView()
      default:
        return null
    }
  }
}
export default Jobs
