import {IoStar} from 'react-icons/io5'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import './index.css'

const JobItem = props => {
  const {details} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = details
  return (
    <li className="job-item-container">
      <Link to={`/jobs/${id}`} className="job-item-link">
        <div>
          <div className="image-role-container">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-logo"
            />
            <div className="job-item-title-container">
              <h1 className="job-item-title">{title}</h1>
              <div className="rating-container">
                <IoStar className="rating-icon" />
                <p className="rating-number">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-type-package-container">
            <div className="location-type-container">
              <MdLocationOn className="location-icon" />
              <p className="location-description">{location}</p>
              <BsBriefcaseFill className="location-icon" />
              <p className="location-description">{employmentType}</p>
            </div>
            <p className="package-description">{packagePerAnnum}</p>
          </div>
          <hr />
          <div>
            <h1 className="jobitem-description-heading">Description</h1>
            <p className="jobitem-description">{jobDescription}</p>
          </div>
        </div>
      </Link>
    </li>
  )
}
export default JobItem
