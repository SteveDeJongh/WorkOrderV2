import { useQuery } from "@tanstack/react-query";
import { fetchInventoryMovementsFor } from "../../services/movementServices";
import { useOutletContext } from "react-router-dom";
import ScrollableTableTable from "../../multiuse/ScrollableTableTall";

function ProductMovements() {
  const {
    productData: {
      product: { id },
    },
  } = useOutletContext();

  const { data, isError, isPending } = useQuery({
    queryKey: ["productMovements", id],
    queryFn: () => fetchInventoryMovementsFor(id),
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

  return (
    <>
      <ScrollableTableTable columns={columns} data={data} />
    </>
  );
}

export default ProductMovements;
