import { Link } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import PropTypes from "prop-types";

function ListItem({ resource, value, linkToPage, handleClick, selected }) {
  return (
    <>
      {resource === "customers" && (
        <Link
          to={`/${resource}/${value.id}/${linkToPage}`}
          className="col-link"
        >
          <li
            onClick={(e) => handleClick(e, value.id)}
            className={`single-col-li ${selected ? "selected" : ""}`}
          >
            {value.first_name + " " + value.last_name}
          </li>
        </Link>
      )}
      {resource === "products" && (
        <Link
          to={`/${resource}/${value.id}/${linkToPage}`}
          className="col-link"
        >
          <li
            onClick={(e) => handleClick(e, value.id)}
            className={`single-col-li ${selected ? "selected" : ""}`}
          >
            <div className="li-row li-top">
              <span>{value.name}</span>
              {/* trim this to x# of characters eventually. */}
              <span>
                {/* {value.price} */}
                <NumericFormat
                  value={Number(value.price).toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              </span>
            </div>
            <div className="li-row li-bottom">
              <span>{value.sku}</span>
              <span>{value.stock}</span>
            </div>
          </li>
        </Link>
      )}
      {resource === "invoices" && (
        <Link
          to={`/${resource}/${value.id}/${linkToPage}`}
          className="col-link"
        >
          <li
            onClick={(e) => handleClick(e, value.id)}
            className={`single-col-li ${selected ? "selected" : ""}`}
          >
            <div className="li-row li-top">
              <span>{value.id}</span>
              <span>
                {/* {value.price} */}
                <NumericFormat
                  value={Number(value.price).toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              </span>
            </div>
            <div className="li-row li-bottom">
              <span>{value.sku}</span>
              <span>{value.stock}</span>
            </div>
          </li>
        </Link>
      )}
    </>
  );
}

ListItem.propTypes = {
  resource: PropTypes.string,
  value: PropTypes.object,
  linkToPage: PropTypes.string,
  handleClick: PropTypes.func,
  selected: PropTypes.bool,
};

export default ListItem;
