import {FaRegStar} from 'react-icons/fa'
import {IoLocationOutline} from 'react-icons/io5'
import {BsBriefcase} from 'react-icons/bs'

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
    <li>
      <div>
        <img src={companyLogoUrl} alt="similar job company logo" />
        <div>
          <h1>{title}</h1>
          <div>
            <FaRegStar />
            <p>{rating}</p>
          </div>
        </div>
      </div>
      <div>
        <h1>Description</h1>
        <p>{jobDescription}</p>
      </div>
      <div>
        <IoLocationOutline />
        <p>{location}</p>
        <BsBriefcase />
        <p>{employmentType}</p>
      </div>
    </li>
  )
}
export default SimilarJobItem
