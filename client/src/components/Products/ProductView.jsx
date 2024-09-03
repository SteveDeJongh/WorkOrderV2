import { useOutletContext, Link } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import { fetchLast3MovementsFor } from "../../services/movementServices";
import { useQuery } from "@tanstack/react-query";

function ProductView() {
  const {
    productData: { product, isError, isPending },
  } = useOutletContext();
  console.log("This is from calling useOutletContext", product);

  const {
    data: movementData,
    isError: movementError,
    isPending: movementPending,
  } = useQuery({
    queryKey: ["3productMovements", product.id],
    queryFn: () => fetchLast3MovementsFor(product.id),
    staleTime: 0,
  });

  return (
    <>
      {isPending && <p>Information loading...</p>}
      {isError && <p>An error occured.</p>}
      {!isPending && !isError && (
        <>
          <div className="main-pane-content">
            <div className="panel">
              <h3>Details</h3>
              <div className="panel-contents">
                <div className="panel-contents-section">
                  <div className="panel-section-desc">Name:</div>
                  <div className="panel-section-data">
                    <div className="data-item">{product.name}</div>
                  </div>
                </div>
                <div className="panel-contents-section">
                  <div className="panel-section-desc">Description:</div>
                  <div className="panel-section-data">
                    <div className="data-item">{product.description}</div>
                  </div>
                </div>
                <div className="panel-contents-section">
                  <div className="panel-section-desc">Sku:</div>
                  <div className="panel-section-data">
                    <div className="data-item">{product.sku}</div>
                  </div>
                </div>
                <div className="panel-contents-section">
                  <div className="panel-section-desc">UPC:</div>
                  <div className="panel-section-data">
                    <div className="data-item">{product.upc}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="panel">
              <h3>Pricing</h3>
              <div className="panel-contents">
                <div className="panel-contents-section">
                  <div className="panel-section-desc">Price:</div>
                  <div className="panel-section-data">
                    <div className="data-item">
                      <NumericFormat
                        value={Number(product.price).toFixed(2)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                    </div>
                  </div>
                </div>
                <div className="panel-contents-section">
                  <div className="panel-section-desc">Cost:</div>
                  <div className="panel-section-data">
                    <div className="data-item">
                      {" "}
                      <NumericFormat
                        value={Number(product.cost).toFixed(2)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="panel customer-details">
              <h3>Inventory</h3>
              <div className="panel-contents">
                {product.inventory && (
                  <>
                    <div className="panel-contents-section">
                      <div className="panel-section-desc">Stock:</div>
                      <div className="panel-section-data">
                        <div className="data-item">{product.stock}</div>
                      </div>
                    </div>
                    <div className="panel-contents-section">
                      <div className="panel-section-desc">Min:</div>
                      <div className="panel-section-data">
                        <div className="data-item">{product.min}</div>
                      </div>
                      <div className="panel-contents-section">
                        <div className="panel-section-desc">Max:</div>
                        <div className="panel-section-data">
                          <div className="data-item">{product.max}</div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {!product.inventory && (
                  <>
                    <div className="panel-contents-section">
                      <div className="panel-section-desc">Stock:</div>
                      <div className="panel-section-data">
                        <div className="data-item">{product.stock}</div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="panel customer-history">
              <h3>Movement History</h3>
              <div className="table short">
                <table>
                  <thead>
                    <tr>
                      <th>Movement ID</th>
                      <th>Relation</th>
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
                    {movementPending && (
                      <tr>
                        <td>Loading...</td>
                      </tr>
                    )}
                    {movementError && (
                      <tr>
                        <td>Error...</td>
                      </tr>
                    )}
                    {!movementPending &&
                      !movementError &&
                      movementData.map((movement) => {
                        return (
                          <tr key={movement.id}>
                            <td>{movement.id}</td>
                            <td>{movement.relation}</td>
                            <td>{movement.adjustment ? "True" : "False"}</td>
                            <td>{movement.change}</td>
                            <td>{movement.stock}</td>
                            <td>{movement.changeType}</td>
                            <td>{movement.user_id}</td>
                            <td>{movement.created_at}</td>
                            <td>{movement.productID}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="100%">
                        <Link
                          to={`/products/${product.id}/movements`}
                          className="inLineLink"
                        >
                          View Full Movement History
                        </Link>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProductView;
