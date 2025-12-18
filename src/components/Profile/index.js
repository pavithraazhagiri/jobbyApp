import './index.css'

const Profile = props => {
  const {profileDetails} = props
  const {profileImageUrl, name, shortBio} = profileDetails
  return (
    <div className="profile-bg-container">
      <img src={profileImageUrl} alt="profile" className="profile-image" />
      <h1 className="profile-name">{name}</h1>
      <p className="profile-bio">{shortBio}</p>
    </div>
  )
}
export default Profile
