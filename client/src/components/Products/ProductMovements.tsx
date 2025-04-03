import { useQuery } from "@tanstack/react-query";
import { fetchInventoryMovementsFor } from "../../services/movementServices";
import { useParams, useNavigate } from "react-router-dom";
import { ScrollableTableTall } from "../multiuse/ScrollableTableTall";
import { Movement } from "../../types/movements";
import { MOVEMENTCOLUMNS } from "../columns";
import { Typography } from "../../utils/muiImports";
import { LoadingBox } from "../multiuse/LoadingBox";

function ProductMovements() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isError, isPending } = useQuery({
    queryKey: ["productMovements", { id }],
    queryFn: () => fetchInventoryMovementsFor(Number(id)),
  });

  function onClick(line: Movement) {
    if (line.change_type === "Invoice") {
      navigate(`/invoices/${line.relation.split(" ")[1]}`);
    }
  }

  return (
    <>
      {isPending && <LoadingBox text="Loading movements..." />}
      {isError && (
        <Typography variant="h5" component={"h5"}>
          Error
        </Typography>
      )}
      {!isPending && !isError && (
        <ScrollableTableTall
          columns={MOVEMENTCOLUMNS}
          data={data}
          onClick={(line: Movement) => onClick(line)}
          height={"65vh"}
        />
      )}
    </>
  );
}

export { ProductMovements };
