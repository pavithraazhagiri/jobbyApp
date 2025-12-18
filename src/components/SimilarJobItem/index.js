import {IoStar} from 'react-icons/io5'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobItem = props => {
  const {details} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    title,
    rating,
  } = details
  return (
    <li className="similar-job-each-item">
      <div className="job-item-details-logo-title-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-jobs-company-logo"
        />
        <div className="job-item-details-title-rating-container">
          <h1 className="job-item-details-title">{title}</h1>
          <div className="job-item-details-rating-container">
            <IoStar className="job-item-details-rating-icon" />
            <p className="job-item-details-rating-description">{rating}</p>
          </div>
        </div>
      </div>
      <div>
        <h1 className="job-item-details-description-heading">Description</h1>
        <p className="job-item-details-job-description">{jobDescription}</p>
      </div>
      <div className="job-item-details-location-type-container">
        <MdLocationOn className="job-item-details-location-icon" />
        <p className="job-item-details-location-description">{location}</p>
        <BsBriefcaseFill className="job-item-details-location-icon" />
        <p className="job-item-details-location-description">
          {employmentType}
        </p>
      </div>
    </li>
  )
}
export default SimilarJobItem
