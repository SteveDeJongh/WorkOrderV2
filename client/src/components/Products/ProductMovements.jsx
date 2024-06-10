import { useQuery } from "@tanstack/react-query";
import { fetchInventoryMovementsFor } from "../../services/movementServices";
import { useOutletContext } from "react-router-dom";

function ProductMovements() {
  const {
    productData: {
      product: { id },
    },
  } = useOutletContext();

  const { data, isError, isPending, isSuccess } = useQuery({
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
      <div id="main-pane-content">
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
                return (
                  <tr key={movement.id}>
                    <td>{movement.id}</td>
                    <td>{movement.relation}</td>
                    <td>{movement.adjustment ? "True" : "False"}</td>
                    <td>{movement.change}</td>
                    <td>{movement.stock}</td>
                    <td>{movement.changeType}</td>
                    <td>{movement.userID}</td>
                    <td>{movement.created_at}</td>
                    <td>{movement.productID}</td>
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
