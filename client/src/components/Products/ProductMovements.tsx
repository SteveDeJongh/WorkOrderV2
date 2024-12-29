import { useQuery } from "@tanstack/react-query";
import { fetchInventoryMovementsFor } from "../../services/movementServices";
import { useParams, useNavigate } from "react-router-dom";
import { ScrollableTableTall } from "../multiuse/ScrollableTableTall";
import { Movement } from "../../types/movements";

function ProductMovements() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isError, isPending } = useQuery({
    queryKey: ["productMovements", id],
    queryFn: () => fetchInventoryMovementsFor(id as string),
  });

  const columns = [
    { name: "Movement ID", propName: "id" },
    { name: "relation", propName: "relation" },
    { name: "Adjustment", propName: "adjustment", returnBoolean: true },
    { name: "Change", propName: "change" },
    { name: "Stock", propName: "stock" },
    { name: "ChangeType", propName: "change_type" },
    { name: "Time", propName: "created_at" },
    { name: "userId", propName: "user_id" },
  ];

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
        columns={columns}
        data={data}
        onClick={(line: Movement) => onClick(line)}
      />
    </>
  );
}

export { ProductMovements };
