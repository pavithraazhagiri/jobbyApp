import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaRegStar} from 'react-icons/fa'
import {IoLocationOutline} from 'react-icons/io5'
import {BsBriefcase} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import SimilarJobItem from '../SimilarJobItem'
import Header from '../Header'
import FailureView from '../FailureView'

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
        <div>
          <div>
            <div>
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="company-logo"
              />
              <div>
                <h1>{title}</h1>
                <div>
                  <FaRegStar />
                  <p>{rating}</p>
                </div>
              </div>
            </div>
            <div>
              <div>
                <IoLocationOutline />
                <p>{location}</p>
                <BsBriefcase />
                <p>{employmentType}</p>
              </div>
              <p>{packagePerAnnum}</p>
            </div>
            <hr />
            <div>
              <div>
                <h1>Description</h1>
                <a href={companyWebsiteUrl}>Visit</a>
              </div>
              <p>{jobDescription}</p>
            </div>
            <div>
              <h1>Skills</h1>
              <ul>
                {skills.map(eachSkill => (
                  <li key={eachSkill.name}>
                    <img src={eachSkill.imageUrl} alt={eachSkill.name} />
                    <p>{eachSkill.name}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h1>Life at Company</h1>
              <div>
                <p>{lifeAtCompany.description}</p>
                <img src={lifeAtCompany.imageUrl} alt="life at company" />
              </div>
            </div>
          </div>
          <div>
            <h1>Similar Jobs</h1>
            <ul>
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
        <Loader type="ThreeDots" color="black" height="50" width="50" />
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
