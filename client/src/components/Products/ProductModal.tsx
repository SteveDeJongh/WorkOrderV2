import { useState, useEffect, useContext } from "react";
import ReactDom from "react-dom";
import LoadingBox from "../../multiuse/LoadingBox";
import ProductForm from "./ProductForm";
import { editProduct, fetchProductData } from "../../services/productServices";
import { objectToFormData } from "../../utils/formDataHelper";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { NumericFormat } from "react-number-format";
import {
  fetchLast3MovementsFor,
  fetchInventoryMovementsFor,
} from "../../services/movementServices";
import { useQuery } from "@tanstack/react-query";
import Button from "../../multiuse/Button";
import { Product } from "../../types/products";

type Props = {
  open: boolean;
  onClose: Function;
  resourceId: number;
  searchTerm: String;
};

function ProductModal({ open, onClose, resourceId, searchTerm }: Props) {
  function handleClose(e) {
    if (e.target.className === "main-modal-background") {
      entity = null;
      onClose();
    }
  }

  // Main states
  const [mainLoading, setMainLoading] = useState(true);
  const [mainError, setMainError] = useState("");
  const [mainData, setMainData] = useState<Product>();
  const [tab, setTab] = useState("View");

  // view Tab
  useEffect(() => {
    async function loadProductData(id: number) {
      try {
        setMainLoading(true);
        const response = await fetchProductData(id);
        setMainData(response);
      } catch (e) {
        setMainError("An error occured fetching the data.");
        console.error(e);
      } finally {
        setMainLoading(false);
      }
    }
    if (resourceId) {
      loadProductData(resourceId);
    }
  }, [resourceId]);

  let entity = mainData
    ? Object.keys(mainData).length < 1
      ? null
      : mainData
    : null;

  useEffect(() => {
    console.log("entity", entity);
    console.log(!!entity);
  }, [entity]);

  const {
    data: is3MovementsData,
    isError: is3MovementsError,
    isPending: is3MovementsPending,
  } = useQuery({
    queryKey: ["3productMovements", entity?.id],
    queryFn: () => fetchLast3MovementsFor(entity!.id),
    enabled: !!entity,
  });

  // Edit Tab
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: async (rawData) => {
      const formData = objectToFormData({ product: rawData });
      await editProduct(resourceId, formData);
      return await fetchProductData(resourceId);
    },
    onSuccess: (data) => {
      console.log(data);
      setMainData(data);
      entity = data;
      const oldData: Product[] | undefined = queryClient.getQueryData([
        "products",
        searchTerm,
      ]);
      let newData = oldData?.map((entry) =>
        entry.id === resourceId ? data : entry
      );
      queryClient.setQueryData(["products", searchTerm], newData);
      setTab("View");
    },
  });

  // Movements

  const {
    data: movementData,
    isError: isMovementError,
    isPending: isMovementPending,
    isSuccess: isMovementSuccess,
  } = useQuery({
    queryKey: ["productMovements", resourceId],
    queryFn: () => fetchInventoryMovementsFor(resourceId),
    enabled: !!entity,
  });

  const pages = ["View", "Edit", "Movements"];

  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div className="main-modal-background" onClick={(e) => handleClose(e)}>
        <div className="main-modal">
          {mainLoading && <LoadingBox text="Loading Product..." />}
          {mainError && <p>An error occured.</p>}
          {!mainLoading && !mainError && entity && (
            <>
              <div className="modal-pane-header">
                <div className="modal-pane-header-title">
                  <h2>{entity.name}</h2>
                  <div className="modal-pane-id">Product {entity.id}</div>
                </div>
                <div className="modal-pane-nav">
                  <ul className="modal-pane-nav mid-nav">
                    {pages.map((page: string) => {
                      return (
                        <li
                          key={page}
                          className={"mid-nav-pill"}
                          onClick={() => setTab(page)}
                        >
                          <span className={page === tab ? "active" : ""}>
                            {page}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              {tab === "View" && (
                <>
                  <div className="modal-content">
                    <div className="panel">
                      <h3>Details</h3>
                      <div className="panel-contents">
                        <div className="panel-contents-section">
                          <div className="panel-section-desc">Name:</div>
                          <div className="panel-section-data">
                            <div className="data-item">{entity.name}</div>
                          </div>
                        </div>
                        <div className="panel-contents-section">
                          <div className="panel-section-desc">Description:</div>
                          <div className="panel-section-data">
                            <div className="data-item">
                              {entity.description}
                            </div>
                          </div>
                        </div>
                        <div className="panel-contents-section">
                          <div className="panel-section-desc">Sku:</div>
                          <div className="panel-section-data">
                            <div className="data-item">{entity.sku}</div>
                          </div>
                        </div>
                        <div className="panel-contents-section">
                          <div className="panel-section-desc">UPC:</div>
                          <div className="panel-section-data">
                            <div className="data-item">{entity.upc}</div>
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
                                value={Number(entity.price).toFixed(2)}
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
                                value={Number(entity.cost).toFixed(2)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="panel product-details">
                      <h3>Inventory</h3>
                      <div className="panel-contents">
                        {entity.inventory && (
                          <>
                            <div className="panel-contents-section">
                              <div className="panel-section-desc">Stock:</div>
                              <div className="panel-section-data">
                                <div className="data-item">{entity.stock}</div>
                              </div>
                            </div>
                            <div className="panel-contents-section">
                              <div className="panel-section-desc">Min:</div>
                              <div className="panel-section-data">
                                <div className="data-item">{entity.min}</div>
                              </div>
                              <div className="panel-contents-section">
                                <div className="panel-section-desc">Max:</div>
                                <div className="panel-section-data">
                                  <div className="data-item">{entity.max}</div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                        {!entity.inventory && (
                          <>
                            <div className="panel-contents-section">
                              <div className="panel-section-desc">Stock:</div>
                              <div className="panel-section-data">
                                <div className="data-item">{entity.stock}</div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="panel product-history">
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
                              <th>user ID</th>
                              <th>Time</th>
                              <th>Product ID</th>
                            </tr>
                          </thead>
                          <tbody>
                            {is3MovementsPending && (
                              <tr>
                                <td>Loading...</td>
                              </tr>
                            )}
                            {is3MovementsError && (
                              <tr>
                                <td>Error...</td>
                              </tr>
                            )}
                            {!is3MovementsPending &&
                              !is3MovementsError &&
                              is3MovementsData.map((movement) => {
                                return (
                                  <tr key={movement.id}>
                                    <td>{movement.id}</td>
                                    <td>{movement.relation}</td>
                                    <td>
                                      {movement.adjustment ? "True" : "False"}
                                    </td>
                                    <td>{movement.change}</td>
                                    <td>{movement.stock}</td>
                                    <td>{movement.change_type}</td>
                                    <td>{movement.user_id}</td>
                                    <td>{movement.created_at}</td>
                                    <td>{movement.product_id}</td>
                                  </tr>
                                );
                              })}
                          </tbody>
                          <tfoot>
                            <tr>
                              <td colSpan="100%">
                                <Button
                                  onClick={() => setTab("Movements")}
                                  className="inLineLink"
                                  text={"View Full Movement History"}
                                />
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {tab === "Edit" && (
                <>
                  <ProductForm
                    modalForm={true}
                    handleCancel={() => setTab("View")}
                    product={entity}
                    headerText={`Edit Product`}
                    buttonText={"Save"}
                    onSubmit={mutate}
                  />
                </>
              )}
              {tab === "Movements" && (
                <>
                  <div className="scrollable-table tall modal-content">
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
                        {isMovementPending && (
                          <tr>
                            <td>Loading...</td>
                          </tr>
                        )}
                        {isMovementError && (
                          <tr>
                            <td>Error...</td>
                          </tr>
                        )}
                        {!isMovementPending &&
                          !isMovementError &&
                          movementData.map((movement) => {
                            return (
                              <tr key={movement.id}>
                                <td>{movement.id}</td>
                                <td>{movement.relation}</td>
                                <td>
                                  {movement.adjustment ? "True" : "False"}
                                </td>
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
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default ProductModal;
