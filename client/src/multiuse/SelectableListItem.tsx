type props = {
  resource: string;
  value: object;
  handleClick: Function;
  selected: boolean;
};

function SelectableListItem({ resource, value, handleClick, selected }: props) {
  return (
    <>
      {resource === "customers" && (
        <li
          onClick={(e) => handleClick(e, value.id)}
          className={`single-col-li ${selected ? "selected" : ""}`}
        >
          {value.first_name + " " + value.last_name}
        </li>
      )}
    </>
  );
}

export default SelectableListItem;
