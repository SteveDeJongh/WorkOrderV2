import { useQuery } from "@tanstack/react-query";
import { fetchInventoryMovementsFor } from "../../services/movementServices";
import { useOutletContext } from "react-router-dom";

function ProductMovements() {
  const {
    productData: {
      product: { id },
    },
  } = useOutletContext();
  console.log(id);

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
        <h1>Product Movements</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>relation</th>
              <th>Adjustment</th>
              <th>Change</th>
              <th>ChangeType</th>
              <th>userId</th>
              <th>Time</th>
              <th>ProductID</th>
            </tr>
          </thead>
          <tbody>
            {data.map((movement) => {
              return (
                <>
                  <tr key={movement.id}>
                    <th>{movement.id}</th>
                    <th>{movement.relation}</th>
                    <th>{movement.adjustment ? "True" : "False"}</th>
                    <th>{movement.change}</th>
                    <th>{movement.changeType}</th>
                    <th>{movement.userID}</th>
                    <th>{movement.created_at}</th>
                    <th>{movement.productID}</th>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ProductMovements;
