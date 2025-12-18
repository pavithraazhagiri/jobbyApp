import {Component} from 'react'
import Cookies from 'js-cookie'
import {IoStar} from 'react-icons/io5'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import SimilarJobItem from '../SimilarJobItem'
import Header from '../Header'
import FailureView from '../FailureView'
import './index.css'

const viewsConstants = {
  loadingView: 'LOADING',
  successView: 'SUCCESS',
  failureView: 'FAILURE',
  initialView: 'INITIAL',
}
class JobItemDetails extends Component {
  state = {
    jobDetails: {
      companyLogoUrl: '',
      companyWebsiteUrl: '',
      employmentType: '',
      id: '',
      jobDescription: '',
      lifeAtCompany: {
        description: '',
        imageUrl: '',
      },
      location: '',
      packagePerAnnum: '',
      rating: '',
      skills: [],
      title: '',
    },
    similarJobs: [],
    view: viewsConstants.initialView,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({view: viewsConstants.loadingView})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const responseData = await response.json()
      console.log(responseData)
      const jobDetails = responseData.job_details
      const similarJobs = responseData.similar_jobs
      const lifeAtCompany = {
        description: jobDetails.life_at_company.description,
        imageUrl: jobDetails.life_at_company.image_url,
      }
      const skills = jobDetails.skills.map(eachSkill => ({
        name: eachSkill.name,
        imageUrl: eachSkill.image_url,
      }))
      const updatedjobDetails = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        lifeAtCompany,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        skills,
        title: jobDetails.title,
      }

      console.log(updatedjobDetails)
      const updatedSimilarJobs = similarJobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      console.log(updatedSimilarJobs)
      this.setState({
        jobDetails: updatedjobDetails,
        similarJobs: updatedSimilarJobs,
        view: viewsConstants.successView,
      })
    } else {
      this.setState({view: viewsConstants.failureView})
    }
  }

  onRetry = () => {
    this.getJobItemDetails()
  }

  renderSuccessView = () => {
    const {jobDetails, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = jobDetails
    return (
      <div>
        <Header />
        <div className="job-item-details-container">
          <div className="job-item-details-top-container">
            <div className="job-item-details-logo-title-container">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="company-logo"
              />
              <div className="job-item-details-title-rating-container">
                <h1 className="job-item-details-title">{title}</h1>
                <div className="job-item-details-rating-container">
                  <IoStar className="job-item-details-rating-icon" />
                  <p className="job-item-details-rating-description">
                    {rating}
                  </p>
                </div>
              </div>
            </div>
            <div className="job-item-details-location-package-container">
              <div className="job-item-details-location-type-container">
                <MdLocationOn className="job-item-details-location-icon" />
                <p className="job-item-details-location-description">
                  {location}
                </p>
                <BsBriefcaseFill className="job-item-details-location-icon" />
                <p className="job-item-details-location-description">
                  {employmentType}
                </p>
              </div>
              <p className="job-item-details-rating-description">
                {packagePerAnnum}
              </p>
            </div>
            <hr className="job-item-details-horizontal-line" />
            <div>
              <div className="job-item-details-description-link-container">
                <h1 className="job-item-details-description-heading">
                  Description
                </h1>
                <a
                  href={companyWebsiteUrl}
                  className="job-item-details-description-visit"
                >
                  Visit
                </a>
              </div>
              <p className="job-item-details-job-description">
                {jobDescription}
              </p>
            </div>
            <div>
              <h1 className="job-item-details-skills-heading">Skills</h1>
              <ul className="job-item-details-skills-ul-list">
                {skills.map(eachSkill => (
                  <li
                    key={eachSkill.name}
                    className="job-item-details-each-skill"
                  >
                    <img
                      src={eachSkill.imageUrl}
                      alt={eachSkill.name}
                      className="job-item-details-skills-image"
                    />
                    <p className="job-item-details-skills-eachskill-name">
                      {eachSkill.name}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h1 className="job-item-details-life-at-company-heading">
                Life at Company
              </h1>
              <div className="job-item-details-life-at-company-image-container">
                <p className="job-item-details-job-description">
                  {lifeAtCompany.description}
                </p>
                <img src={lifeAtCompany.imageUrl} alt="life at company" />
              </div>
            </div>
          </div>
          <div>
            <h1 className="job-item-details-similar-jobs-heading">
              Similar Jobs
            </h1>
            <ul className="job-item-details-similar-jobs-ul-list">
              {similarJobs.map(eachSimilarJob => (
                <SimilarJobItem
                  details={eachSimilarJob}
                  key={eachSimilarJob.id}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

  renderLoadingView = () => (
    <div>
      <Header />
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="white" height="50" width="50" />
      </div>
    </div>
  )

  render() {
    const {view} = this.state
    switch (view) {
      case viewsConstants.successView:
        return this.renderSuccessView()
      case viewsConstants.failureView:
        return this.renderFailureView()
      case viewsConstants.loadingView:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}
export default JobItemDetails
