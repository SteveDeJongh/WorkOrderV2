function ViewToggle({ view, setView }) {
  function onBtnClick(v) {
    setView(v);
  }

  return (
    <>
      <div className="views">
        <h3>View:</h3>
        <button
          className={view === "profile" ? "view-choice active" : "view-choice"}
          onClick={() => onBtnClick("profile")}
        >
          <img className="view-img" src="../../public/icons/profile.png"></img>
        </button>
        <button
          className={view === "table" ? "view-choice active" : "view-choice"}
          onClick={() => onBtnClick("table")}
        >
          <img className="view-img" src="../../public/icons/cells.png"></img>
        </button>
      </div>
    </>
  );
}

export default ViewToggle;
