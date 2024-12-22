import Button from "./Button";

type props = {
  view: string;
  setView: Function;
};

function ViewToggle({ view, setView }: props) {
  function onBtnClick(v: string) {
    setView(v);
  }

  return (
    <>
      <div className="views">
        <h3>View:</h3>
        <Button
          className={view === "profile" ? "view-choice active" : "view-choice"}
          onClick={() => onBtnClick("profile")}
          text={<img className="view-img" src="../../icons/profile.png" />}
        />
        <Button
          className={view === "table" ? "view-choice active" : "view-choice"}
          onClick={() => onBtnClick("table")}
          text={<img className="view-img" src="../../icons/cells.png" />}
        />
      </div>
    </>
  );
}

export default ViewToggle;
