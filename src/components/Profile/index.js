import './index.css'

const Profile = props => {
  const {profileDetails} = props
  const {profileImageUrl, name, shortBio} = profileDetails
  return (
    <div className="profile-bg-container">
      <img src={profileImageUrl} alt="profile" />
      <h1>{name}</h1>
      <p>{shortBio}</p>
    </div>
  )
}
export default Profile
