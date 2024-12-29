type Props = {
  text: string;
};

function LoadingBox({ text }: Props) {
  return (
    <>
      <div className="loading-box">
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

export { LoadingBox };
