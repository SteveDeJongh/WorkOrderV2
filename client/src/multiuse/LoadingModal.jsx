function LoadingModal({ text }) {
  return (
    <>
      <div className="loading-modal-background"></div>
      <div className="loading-modal">
        <div className="loading-spinner">
          <div className="container">
            <div className="dot"></div>
          </div>
          <div className="container">
            <div className="dot"></div>
          </div>
          <div className="container">
            <div className="dot"></div>
          </div>
          <div className="container">
            <div className="dot"></div>
          </div>
          <div className="container">
            <div className="dot"></div>
          </div>
          <div className="container">
            <div className="dot"></div>
          </div>
          <div className="container">
            <div className="dot"></div>
          </div>
          <div className="container">
            <div className="dot"></div>
          </div>
          <div className="container">
            <div className="dot"></div>
          </div>
          <div className="container">
            <div className="dot"></div>
          </div>
        </div>
        <p className="loading-text">{text}</p>
      </div>
    </>
  );
}

export default LoadingModal;
