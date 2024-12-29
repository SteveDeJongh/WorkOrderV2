import { Link } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import { Customer, isCustomer } from "../../types/customers";
import { isProduct } from "../../types/products";
import { isInvoice } from "../../types/invoiceTypes";

type Props = {
  value: Customer | Object;
  linkToPage: string;
  selected: boolean;
};

function ListItem({ value, linkToPage, selected }: Props) {
  return (
    <>
      {isCustomer(value) && (
        <Link to={`/customers/${value.id}/${linkToPage}`} className="col-link">
          <li className={`single-col-li ${selected ? "selected" : ""}`}>
            {value.first_name + " " + value.last_name}
          </li>
        </Link>
      )}
      {isProduct(value) && (
        <Link to={`/products/${value.id}/${linkToPage}`} className="col-link">
          <li className={`single-col-li ${selected ? "selected" : ""}`}>
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
      {isInvoice(value) && (
        <Link to={`/invoices/${value.id}/${linkToPage}`} className="col-link">
          <li className={`single-col-li ${selected ? "selected" : ""}`}>
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

export { ListItem };
