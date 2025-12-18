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

const locationList = [
  {
    locationId: 'Hyderabad',
    label: 'Hyderabad',
  },
  {
    locationId: 'Delhi',
    label: 'Delhi',
  },
  {
    locationId: 'Bangalore',
    label: 'Bangalore',
  },
  {
    locationId: 'Chennai',
    label: 'Chennai',
  },
  {
    locationId: 'Mumbai',
    label: 'Mumbai',
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
    locationFilter: [],
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
      console.log(jobDetailsList)
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

  onChangeLocation = event => {
    const {locationFilter} = this.state
    if (event.target.checked) {
      this.setState(prevState => ({
        locationFilter: [...prevState.locationFilter, event.target.value],
      }))
    } else {
      const updatedLocationFilter = locationFilter.filter(
        eachLocation => eachLocation !== event.target.value,
      )
      this.setState({locationFilter: updatedLocationFilter})
    }
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
    <div className="employment-search-panel-container">
      <h1 className="employment-heading">Type of Employment</h1>
      <ul className="employment-filters-list">
        {employmentTypesList.map(eachObj => (
          <li
            key={eachObj.employmentTypeId}
            className="employment-filter-each-list-item"
          >
            <input
              type="checkbox"
              id={eachObj.employmentTypeId}
              value={eachObj.employmentTypeId}
              onChange={this.onChangeEmploymentFilter}
            />
            <label
              htmlFor={eachObj.employmentTypeId}
              className="employment-filter-label"
            >
              {eachObj.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  renderSalaryRangeSearchPanel = () => (
    <div className="employment-search-panel-container">
      <h1 className="employment-heading">Salary Range</h1>
      <ul className="employment-filters-list">
        {salaryRangesList.map(eachSalaryObj => (
          <li
            key={eachSalaryObj.salaryRangeId}
            className="employment-filter-each-list-item"
          >
            <input
              type="radio"
              id={eachSalaryObj.salaryRangeId}
              name="salary"
              onChange={this.onChangeSalary}
              value={eachSalaryObj.salaryRangeId}
            />
            <label
              htmlFor={eachSalaryObj.salaryRangeId}
              className="employment-filter-label"
            >
              {eachSalaryObj.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  renderlocationSearchPanel = () => (
    <div className="employment-search-panel-container">
      <h1 className="employment-heading">Location</h1>
      <ul className="employment-filters-list">
        {locationList.map(eachLocation => (
          <li
            key={eachLocation.locationId}
            className="employment-filter-each-list-item"
          >
            <input
              type="checkbox"
              id={eachLocation.locationId}
              value={eachLocation.locationId}
              onChange={this.onChangeLocation}
            />
            <label
              htmlFor={eachLocation.locationId}
              className="employment-filter-label"
            >
              {eachLocation.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  renderSearchInputPanel = () => {
    const {searchInputString} = this.state
    return (
      <div className="search-input-container">
        <input
          type="search"
          placeholder="Search"
          value={searchInputString}
          onChange={this.onChangeSearchInput}
          id="search"
          className="search-input"
        />
        <button
          type="button"
          data-testid="searchButton"
          onClick={this.getJobDetails}
          className="search-button"
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  getProfileContent = () => {
    const {profileView, profileDetails} = this.state
    let profileContent
    switch (profileView) {
      case viewsConstants.loadingView:
        profileContent = (
          <div className="profile-loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="white" height="50" width="50" />
          </div>
        )
        break
      case viewsConstants.successView:
        profileContent = <Profile profileDetails={profileDetails} />
        break
      case viewsConstants.profilefailureView:
        profileContent = (
          <div className="profile-failure-view-button-container">
            <button
              type="button"
              onClick={this.onProfileRetry}
              data-testid="profileRetryButton"
              className="profile-retry-button"
            >
              Retry
            </button>
          </div>
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
        <div className="search-panel-small-devices-container">
          {this.renderSearchInputPanel()}
        </div>
        <div className="jobs-bottom-left-container">
          {this.getProfileContent()}
          <hr className="horizontal-line" />
          {this.renderEmploymentSearchPanel()}
          <hr className="horizontal-line" />
          {this.renderSalaryRangeSearchPanel()}
          <hr className="horizontal-line" />
          {this.renderlocationSearchPanel()}
        </div>
        <div className="search-panel-and-loader-container">
          <div className="search-panel-large-devices-container">
            {this.renderSearchInputPanel()}
          </div>
          <div className="jobs-bottom-right-container">
            <div className="loader-container" data-testid="loader">
              <Loader type="ThreeDots" color="white" height="50" width="50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  renderSuccessView = () => {
    const {jobDetailsList, locationFilter} = this.state
    const updatedJobDetailsList =
      locationFilter.length > 0
        ? jobDetailsList.filter(eachJob =>
            locationFilter.includes(eachJob.location),
          )
        : jobDetailsList
    return (
      <div>
        <Header />
        <div className="jobs-bottom-container">
          <div className="search-panel-small-devices-container">
            {this.renderSearchInputPanel()}
          </div>
          <div className="jobs-bottom-left-container">
            {this.getProfileContent()}
            <hr className="horizontal-line" />
            {this.renderEmploymentSearchPanel()}
            <hr className="horizontal-line" />
            {this.renderSalaryRangeSearchPanel()}
            <hr className="horizontal-line" />
            {this.renderlocationSearchPanel()}
          </div>
          <div className="jobs-bottom-right-outer-container">
            <div className="search-panel-large-devices-container">
              {this.renderSearchInputPanel()}
            </div>
            <ul className="jobs-bottom-right-container">
              {updatedJobDetailsList.map(eachJob => (
                <JobItem details={eachJob} key={eachJob.id} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  renderJobsFailureView = () => (
    <div>
      <Header />
      <div className="jobs-bottom-container">
        <div className="search-panel-small-devices-container">
          {this.renderSearchInputPanel()}
        </div>
        <div className="jobs-bottom-left-container">
          {this.getProfileContent()}
          <hr className="horizontal-line" />
          {this.renderEmploymentSearchPanel()}
          <hr className="horizontal-line" />
          {this.renderSalaryRangeSearchPanel()}
          <hr className="horizontal-line" />
          {this.renderlocationSearchPanel()}
        </div>
        <div className="search-panel-and-jobs-container">
          <div className="search-panel-large-devices-container">
            {this.renderSearchInputPanel()}
          </div>
          <div className="jobs-bottom-right-container">
            <FailureView onRetry={this.onRetry} />
          </div>
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
          <div className="search-panel-small-devices-container">
            {this.renderSearchInputPanel()}
          </div>
          <div className="jobs-bottom-left-container">
            <div className="profile-failure-view-button-container">
              <button
                type="button"
                onClick={this.onProfileRetry}
                data-testid="profileRetryButton"
                className="profile-retry-button"
              >
                Retry
              </button>
            </div>
            <hr className="horizontal-line" />
            {this.renderEmploymentSearchPanel()}
            <hr className="horizontal-line" />
            {this.renderSalaryRangeSearchPanel()}
            <hr className="horizontal-line" />
            {this.renderlocationSearchPanel()}
          </div>
          <div className="jobs-bottom-right-outer-container">
            <div className="search-panel-large-devices-container">
              {this.renderSearchInputPanel()}
            </div>
            <div className="jobs-bottom-right-container">
              {jobDetailsList.map(eachJob => (
                <JobItem details={eachJob} key={eachJob.id} />
              ))}
            </div>
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
          <div className="search-panel-small-devices-container">
            {this.renderSearchInputPanel()}
          </div>
          <div className="jobs-bottom-left-container">
            <Profile profileDetails={profileDetails} />
            <hr className="horizontal-line" />
            {this.renderEmploymentSearchPanel()}
            <hr className="horizontal-line" />
            {this.renderSalaryRangeSearchPanel()}
            <hr className="horizontal-line" />
            {this.renderlocationSearchPanel()}
          </div>
          <div className="jobs-bottom-right-outer-container">
            <div className="search-panel-large-devices-container">
              {this.renderSearchInputPanel()}
            </div>
            <div className="jobs-bottom-right-container">
              <div className="no-jobs-view-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                  alt="no jobs"
                  className="no-jobs-found-image"
                />
                <h1 className="no-jobs-found-heading">No Jobs Found</h1>
                <p className="no-jobs-found-description">
                  We could not find any jobs. Try other filters
                </p>
              </div>
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
