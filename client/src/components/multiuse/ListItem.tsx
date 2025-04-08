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
    <Grid2
      container
      component={"span"}
      direction="row"
      justifyContent="space-between"
    >
      <Typography variant="body1" component={"span"}>
        {t1}
      </Typography>
      <Typography variant="body1" component={"span"}>
        {t2}
      </Typography>
    </Grid2>
  );
}

type Props = {
  value: Object;
  selected: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;
};

function ListItem({ value, selected, onClick }: Props) {
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
        <ListItemButton selected={selected} onClick={onClick}>
          <ListItemText
            primary={spreadStrings(`ID: ${value.id}`, value.status)}
            secondary={spreadStrings(
              `B: ${`$${Number(value.balance).toFixed(2)}`}`,
              `T: ${`$${Number(value.total).toFixed(2)}`}`
            )}
          />
        </ListItemButton>
      )}
    </>
  );
}

export { ListItem };
