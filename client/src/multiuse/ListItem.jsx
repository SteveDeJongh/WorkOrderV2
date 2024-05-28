import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function ListItem({ resource, value, page, handleClick, selected }) {
  return (
    <>
      <Link to={`/${resource}/${value.id}/${page}`} className="col-link">
        <li
          onClick={(e) => handleClick(e, value.id)}
          className={`single-col-li ${selected ? "selected" : ""}`}
        >
          {value.fullName}
        </li>
      </Link>
    </>
  );
}

ListItem.propTypes = {
  value: PropTypes.object,
  handleClick: PropTypes.func,
  selected: PropTypes.bool,
};

export default ListItem;
