import {FaRegStar} from 'react-icons/fa'
import {IoLocationOutline} from 'react-icons/io5'
import {BsBriefcase} from 'react-icons/bs'
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
    <li>
      <Link to={`/jobs/${id}`}>
        <div>
          <div>
            <img
              src={companyLogoUrl}
              alt="company logo"
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
            <h1>Description</h1>
            <p>{jobDescription}</p>
          </div>
        </div>
      </Link>
    </li>
  )
}
export default JobItem
