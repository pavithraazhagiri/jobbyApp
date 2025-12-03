const FailureView = props => {
  const {onRetry} = props
  const retry = () => {
    onRetry()
  }

  return (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={retry}>
        Retry
      </button>
    </div>
  )
}
export default FailureView
