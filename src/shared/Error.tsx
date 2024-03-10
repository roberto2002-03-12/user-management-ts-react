import './styles/ErrorStyle.css';

export const Error = () => {
  return (
    <div className="container error-404-container">
      <h2 className='error-404-title'>Error 404</h2>
      <div className="error-404-text-box">
        <p>That page doesn't exist, please check the url or go back to where you were.</p>
      </div>
    </div>
  )
}
