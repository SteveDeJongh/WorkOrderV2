import { Link } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import { Customer, isCustomer } from "../types/customers";
import { isProduct } from "../types/products";
import { isInvoice } from "../types/invoiceTypes";

type Props = {
  resource: string;
  value: Customer | Object;
  linkToPage: string;
  handleClick: Function;
  selected: boolean;
};

function ListItem({
  resource,
  value,
  linkToPage,
  handleClick,
  selected,
}: Props) {
  return (
    <>
      {resource === "customers" && isCustomer(value) && (
        <Link
          to={`/${resource}/${value.id}/${linkToPage}`}
          className="col-link"
        >
          <li
            onClick={() => handleClick(value.id)}
            className={`single-col-li ${selected ? "selected" : ""}`}
          >
            {value.first_name + " " + value.last_name}
          </li>
        </Link>
      )}
      {resource === "products" && isProduct(value) && (
        <Link
          to={`/${resource}/${value.id}/${linkToPage}`}
          className="col-link"
        >
          <li
            onClick={() => handleClick(value.id)}
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
      {resource === "invoices" && isInvoice(value) && (
        <Link
          to={`/${resource}/${value.id}/${linkToPage}`}
          className="col-link"
        >
          <li
            onClick={() => handleClick(value.id)}
            className={`single-col-li ${selected ? "selected" : ""}`}
          >
            <div className="li-row li-top">
              <span>Invoice: {value.id}</span>
              <span className={`product-span ${value.status}`}>
                {value.status}
              </span>
            </div>
            <div className="li-row li-bottom">
              <span>
                B:{" "}
                <NumericFormat
                  value={Number(value.balance).toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              </span>
              <span>
                T:{" "}
                <NumericFormat
                  value={Number(value.total).toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              </span>
            </div>
          </li>
        </Link>
      )}
    </>
  );
}

export default ListItem;
