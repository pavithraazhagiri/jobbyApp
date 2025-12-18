import './index.css'

const FailureView = props => {
  const {onRetry} = props
  const retry = () => {
    onRetry()
  }

  return (
    <div className="failure-view-container">
      <div className="failure-view-inner-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="job-item-details-failure-image"
        />
        <h1 className="job-item-detail-failure-heading">
          Oops! Something Went Wrong
        </h1>
        <p className="job-item-detail-failure-description">
          We cannot seem to find the page you are looking for
        </p>
        <button
          type="button"
          onClick={retry}
          className="job-item-detail-failure-button"
        >
          Retry
        </button>
      </div>
    </div>
  )
}
export default FailureView
