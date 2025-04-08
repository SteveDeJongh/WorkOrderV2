import { Chip, Grid2, Stack, Typography } from "../../utils/muiImports";
import { Invoice } from "../../types/invoiceTypes";
import { showAsDollarAmount } from "../../utils/index";

type props = {
  invoice: Invoice;
};

function InvoiceTotalDetails({ invoice }: props) {
  return (
    <Stack spacing={1}>
      <Typography variant="h6">Totals</Typography>
      <Grid2 container spacing={1} sx={{ padding: 1 }}>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Typography component="div" variant={"body1"}>
            Sub Total: <Chip label={showAsDollarAmount(invoice.sub_total)} />
          </Typography>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Typography component="div" variant="body1">
            Tax: <Chip label={showAsDollarAmount(invoice.tax)} />
          </Typography>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Typography component="div" variant="body1">
            Total: <Chip label={showAsDollarAmount(invoice.total)} />
          </Typography>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Typography component="div" variant="body1">
            Balance:{" "}
            <Chip
              color={invoice.balance == 0 ? "success" : "error"}
              label={showAsDollarAmount(invoice.balance)}
            />
          </Typography>
        </Grid2>
      </Grid2>
    </Stack>
  );
}

export { InvoiceTotalDetails };
