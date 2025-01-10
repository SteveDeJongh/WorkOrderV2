import { useQuery } from "@tanstack/react-query";
import { fetchInventoryMovementsFor } from "../../services/movementServices";
import { useParams, useNavigate } from "react-router-dom";
import { ScrollableTableTall } from "../multiuse/ScrollableTableTall";
import { Movement } from "../../types/movements";
import { MOVEMENTCOLUMNS } from "../columns";

function ProductMovements() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isError, isPending } = useQuery({
    queryKey: ["productMovements", { id }],
    queryFn: () => fetchInventoryMovementsFor(Number(id)),
  });

  if (isPending) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Error</h1>;
  }

  function onClick(line: Movement) {
    if (line.change_type === "Invoice") {
      navigate(`/invoices/${line.relation.split(" ")[1]}`);
    }
  }

  return (
    <>
      <ScrollableTableTall
        columns={MOVEMENTCOLUMNS}
        data={data}
        onClick={(line: Movement) => onClick(line)}
      />
    </>
  );
}

export { ProductMovements };
