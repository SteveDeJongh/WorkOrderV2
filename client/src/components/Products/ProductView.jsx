import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCustomerData } from "../../services/customerServices";
import { NumericFormat } from "react-number-format";
import { fetchProductData } from "../../services/productServices";
import { useQuery } from "@tanstack/react-query";

function ProductView() {
  // const [mainLoading, setMainLoading] = useState(false);
  // const [mainError, setMainError] = useState(false);
  // const [productData, setProductData] = useState({});
  let { id } = useParams();

  // useEffect(() => {
  //   async function loadProductData() {
  //     if (!id) {
  //       setProductData({});
  //       return;
  //     }
  //     try {
  //       setMainLoading(true);
  //       const response = await fetchProductData(id);
  //       setProductData(response);
  //     } catch (e) {
  //       setMainError("An error occured fetching the data.");
  //       console.error(e);
  //     } finally {
  //       setMainLoading(false);
  //     }
  //   }

  //   loadProductData();
  // }, [id]);

  // useEffect(() => {
  //   async function getProductMovements() {}
  //   getProductMovements();
  // }, [id]);

  // Using react-query

  const { data, isError, isPending, isSuccess } = useQuery({
    queryKey: ["product"],
    queryFn: () => fetchProductData(id),
  });

  let product;
  if (isSuccess) {
    product = Object.keys(data).length < 1 ? false : data;
  }

  return (
    <>
      {isPending && <p>Information loading...</p>}
      {isError && <p>An error occured.</p>}
      {!isPending && !isError && (
        <>
          {!product && <h2>No Product Selected</h2>}
          {product && (
            <>
              <div id="main-pane-content">
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
                  <h3>Movements</h3>
                  <ul>
                    <li>Todo...</li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default ProductView;
