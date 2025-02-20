import { useOutletContext, Link, useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import { fetchLast3MovementsFor } from "../../services/movementServices";
import { useQuery } from "@tanstack/react-query";
import { dateTimeFormatter } from "../../utils";
import { ProductContext } from "../../types/products";

function ProductView() {
  const navigate = useNavigate();
  const { mainData, setMainData } = useOutletContext<ProductContext>();

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
      {mainData && (
        <>
          <div className="main-pane-content">
            <div className="panel">
              <h3>Details</h3>
              <div className="panel-contents">
                <div className="panel-contents-section">
                  <div className="panel-section-desc">Name:</div>
                  <div className="panel-section-data">
                    <div className="data-item">{mainData.name}</div>
                  </div>
                </div>
                <div className="panel-contents-section">
                  <div className="panel-section-desc">Description:</div>
                  <div className="panel-section-data">
                    <div className="data-item">{mainData.description}</div>
                  </div>
                </div>
                <div className="panel-contents-section">
                  <div className="panel-section-desc">Sku:</div>
                  <div className="panel-section-data">
                    <div className="data-item">{mainData.sku}</div>
                  </div>
                </div>
                <div className="panel-contents-section">
                  <div className="panel-section-desc">UPC:</div>
                  <div className="panel-section-data">
                    <div className="data-item">{mainData.upc}</div>
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
                        value={Number(mainData.price).toFixed(2)}
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
                        value={Number(mainData.cost).toFixed(2)}
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
                {mainData.inventory && (
                  <>
                    <div className="panel-contents-section">
                      <div className="panel-section-desc">Stock:</div>
                      <div className="panel-section-data">
                        <div className="data-item">{mainData.stock}</div>
                      </div>
                    </div>
                    <div className="panel-contents-section">
                      <div className="panel-section-desc">Min:</div>
                      <div className="panel-section-data">
                        <div className="data-item">{mainData.min}</div>
                      </div>
                      <div className="panel-contents-section">
                        <div className="panel-section-desc">Max:</div>
                        <div className="panel-section-data">
                          <div className="data-item">{mainData.max}</div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {!mainData.inventory && (
                  <>
                    <div className="panel-contents-section">
                      <div className="panel-section-desc">Stock:</div>
                      <div className="panel-section-data">
                        <div className="data-item">{mainData.stock}</div>
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
                          <tr
                            key={movement.id}
                            onClick={() => {
                              if (movement.change_type === "Invoice") {
                                navigate(
                                  `/invoices/${movement.relation.split(" ")[1]}`
                                );
                              }
                            }}
                          >
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
                  <tfoot>
                    <tr>
                      <td colSpan={"100%"}>
                        <Link
                          to={`/products/${mainData.id}/movements`}
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

export { ProductView };
