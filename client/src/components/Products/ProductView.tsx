import { useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import { fetchLast3MovementsFor } from "../../services/movementServices";
import { useQuery } from "@tanstack/react-query";
import { dateTimeFormatter } from "../../utils";
import { Product } from "../../types/products";
import {
  Box,
  Button,
  FormLabel,
  Grid2,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "../../utils/muiImports";

type Props = {
  mainData: Product;
  setTab: React.Dispatch<React.SetStateAction<number>>;
};

function ProductView({ mainData, setTab }: Props) {
  const navigate = useNavigate();

  const {
    data: movementData,
    isError: movementError,
    isPending: movementPending,
  } = useQuery({
    queryKey: ["3productMovements", { id: mainData.id }],
    queryFn: () => fetchLast3MovementsFor(mainData.id),
    staleTime: 0,
  });

  return (
    <>
      {!mainData && (
        <Typography component={"h2"} variant="h2">
          No Product Selected
        </Typography>
      )}
      {mainData && (
        <>
          <Stack
            spacing={3}
            py={1}
            sx={{ overflowY: "auto", maxHeight: "65vh" }}
          >
            <Paper variant="outlined" sx={{ padding: 1 }}>
              <Typography variant="h6" component="h6" pb={1}>
                Details
              </Typography>
              <Grid2
                container
                direction={"row"}
                justifyContent={"space-evenly"}
              >
                <Box width={"50%"}>
                  <FormLabel style={{ fontWeight: "bold" }}>Name:</FormLabel>
                  <Typography variant="body1">{mainData.name}</Typography>
                </Box>
                <Box width={"50%"}>
                  <FormLabel style={{ fontWeight: "bold" }}>
                    Description:
                  </FormLabel>
                  <Typography variant="body1">
                    {mainData.description}
                  </Typography>
                </Box>
              </Grid2>
              <Grid2 container direction="row" justifyContent={"space-evenly"}>
                <Box width={"50%"}>
                  <FormLabel style={{ fontWeight: "bold" }}>Sku:</FormLabel>
                  <Typography variant="body1">{mainData.sku}</Typography>
                </Box>
                <Box width={"50%"}>
                  <FormLabel style={{ fontWeight: "bold" }}>UPC:</FormLabel>
                  <Typography variant="body1">{mainData.upc}</Typography>
                </Box>
              </Grid2>
            </Paper>
            <Paper variant="outlined" sx={{ padding: 1 }}>
              <Typography variant="h6" component="h6" pb={1}>
                Pricing
              </Typography>
              <Grid2 container direction="row" justifyContent={"space-evenly"}>
                <Box width={"50%"}>
                  <FormLabel style={{ fontWeight: "bold" }}>Price:</FormLabel>
                  <Typography variant="body1">
                    <NumericFormat
                      value={Number(mainData.price).toFixed(2)}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </Typography>
                </Box>
                <Box width={"50%"}>
                  <FormLabel style={{ fontWeight: "bold" }}>Cost:</FormLabel>
                  <Typography variant="body1">
                    <NumericFormat
                      value={Number(mainData.cost).toFixed(2)}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </Typography>
                </Box>
              </Grid2>
            </Paper>
            <Paper variant="outlined" sx={{ padding: 1 }}>
              <Typography variant="h6" component="h6" pb={1}>
                Inventory
              </Typography>
              <Grid2 container direction="row" justifyContent={"space-evenly"}>
                <Box width="33.3333%">
                  <FormLabel style={{ fontWeight: "bold" }}>Stock:</FormLabel>
                  <Typography variant="body1">{mainData.stock}</Typography>
                </Box>
                <Box width="33.3333%">
                  <FormLabel style={{ fontWeight: "bold" }}>Min:</FormLabel>
                  <Typography variant="body1">{mainData.min}</Typography>
                </Box>
                <Box width="33.3333%">
                  <FormLabel style={{ fontWeight: "bold" }}>Max:</FormLabel>
                  <Typography variant="body1">{mainData.max}</Typography>
                </Box>
              </Grid2>
              {/* {!mainData.inventory && (
                <>
                  <div className="panel-contents-section">
                    <FormLabel style={{ fontWeight: "bold" }}>Stock:</FormLabel>
                    <Typography variant="body1">{mainData.stock}</Typography>
                  </div>
                </>
              )} */}
            </Paper>
            <Paper variant="outlined" sx={{ padding: 1 }}>
              <Typography variant="h6" component="h6" pb={1}>
                Movement History
              </Typography>
              <TableContainer
                className="table short"
                sx={{ whiteSpace: "nowrap" }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">Movement ID</TableCell>
                      <TableCell align="right">Relation</TableCell>
                      <TableCell align="right">Adjustment</TableCell>
                      <TableCell align="right">Change</TableCell>
                      <TableCell align="right">Stock</TableCell>
                      <TableCell align="right">ChangeType</TableCell>
                      <TableCell align="right">userId</TableCell>
                      <TableCell align="right">Time</TableCell>
                      <TableCell align="right">ProductID</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {movementPending && (
                      <TableRow>
                        <TableCell>Loading...</TableCell>
                      </TableRow>
                    )}
                    {movementError && (
                      <TableRow>
                        <TableCell>Error...</TableCell>
                      </TableRow>
                    )}
                    {!movementPending &&
                      !movementError &&
                      movementData.map((movement) => {
                        return (
                          <TableRow
                            key={movement.id}
                            onClick={() => {
                              if (movement.change_type === "Invoice") {
                                navigate(
                                  `/invoices/${movement.relation.split(" ")[1]}`
                                );
                              }
                            }}
                          >
                            <TableCell>{movement.id}</TableCell>
                            <TableCell>{movement.relation}</TableCell>
                            <TableCell>
                              {movement.adjustment ? "True" : "False"}
                            </TableCell>
                            <TableCell>{movement.change}</TableCell>
                            <TableCell>{movement.stock}</TableCell>
                            <TableCell>{movement.change_type}</TableCell>
                            <TableCell>{movement.user_id}</TableCell>
                            <TableCell>
                              {dateTimeFormatter(movement.created_at)}
                            </TableCell>
                            <TableCell>{movement.product_id}</TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={4}>
                        <Button onClick={() => setTab(2)}>
                          View Full Movement History
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </Paper>
          </Stack>
        </>
      )}
    </>
  );
}

export { ProductView };
