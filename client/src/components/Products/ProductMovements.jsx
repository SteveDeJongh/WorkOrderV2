import { useQuery } from "@tanstack/react-query";
import { fetchInventoryMovementsFor } from "../../services/movementServices";
import { useOutletContext } from "react-router-dom";
import { dateTimeFormatter } from "../../utils";

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

  if (isPending) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Error</h1>;
  }

  return (
    <>
      <div className="main-pane-content">
        <div className="scrollable-table tall">
          <table>
            <thead>
              <tr>
                <th>Movement ID</th>
                <th>relation</th>
                <th>Adjustment</th>
                <th>Change</th>
                <th>Stock</th>
                <th>ChangeType</th>
                <th>userId</th>
                <th>Time</th>
                <th>ProductID</th>
              </tr>
            </thead>
            <tbody>
              {data.map((movement) => {
                console.log(movement);
                return (
                  <tr key={movement.id}>
                    <td>{movement.id}</td>
                    <td>{movement.relation}</td>
                    <td>{movement.adjustment ? "True" : "False"}</td>
                    <td>{movement.change}</td>
                    <td>{movement.stock}</td>
                    <td>{movement.change_type}</td>
                    <td>{movement.user_id}</td>
                    <td>{dateTimeFormatter(movement.created_at)}</td>
                    <td>{movement.product_id}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ProductMovements;
