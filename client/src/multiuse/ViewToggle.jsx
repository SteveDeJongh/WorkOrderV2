import Button from "./Button";

function ViewToggle({ view, setView }) {
  function onBtnClick(v) {
    setView(v);
  }

  return (
    <>
      <div className="views">
        <h3>View:</h3>
        <Button
          className={view === "profile" ? "view-choice active" : "view-choice"}
          onClick={() => onBtnClick("profile")}
          text={
            <img
              className="view-img"
              src="../../public/icons/profile.png"
            ></img>
          }
        />
        <Button
          className={view === "table" ? "view-choice active" : "view-choice"}
          onClick={() => onBtnClick("table")}
          text={
            <img className="view-img" src="../../public/icons/cells.png"></img>
          }
        />
      </div>
    </>
  );
}

export default ViewToggle;
