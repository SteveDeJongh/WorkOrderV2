import { Link } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import { isCustomer } from "../../types/customers";
import { isProduct } from "../../types/products";
import { isInvoice } from "../../types/invoiceTypes";
import {
  Grid2,
  ListItemButton,
  ListItemText,
  Typography,
} from "../../utils/muiImports";

function spreadStrings(t1: string, t2: string) {
  return (
    <Grid2 container direction="row" justifyContent="space-between">
      <Typography variant="body1">{t1}</Typography>
      <Typography variant="body1">{t2}</Typography>
    </Grid2>
  );
}

type Props = {
  value: Object;
  linkToPage: string;
  selected: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;
};

function ListItem({ value, linkToPage, selected, onClick }: Props) {
  return (
    <>
      {isCustomer(value) && (
        <ListItemButton selected={selected} onClick={onClick}>
          <ListItemText>
            {value.first_name + " " + value.last_name}
          </ListItemText>
        </ListItemButton>
      )}
      {isProduct(value) && (
        <ListItemButton selected={selected} onClick={onClick}>
          <ListItemText
            primary={spreadStrings(
              value.name,
              `$${parseInt(value.price).toFixed(2)}`
            )}
            secondary={spreadStrings(value.sku, String(value.stock))}
          />
        </ListItemButton>
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
