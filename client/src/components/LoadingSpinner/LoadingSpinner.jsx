import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="loader-dot"></div>
        <div className="loader-dot"></div>
        <div className="loader-dot"></div>
        <div className="loader-ring"></div>
      </div>
      <div className="loader-text">
        <span>Sivaprakash</span> M
      </div>
    </div>
  );
};

export default LoadingSpinner;
