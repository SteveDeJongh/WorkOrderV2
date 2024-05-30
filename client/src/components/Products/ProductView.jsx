import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCustomerData } from "../../services/customerServices";
import { fetchProductData } from "../../services/productServices";

function ProductView() {
  const [mainLoading, setMainLoading] = useState(false);
  const [mainError, setMainError] = useState(false);
  const [productData, setProductData] = useState({});
  let { id } = useParams();

  useEffect(() => {
    async function loadProductData() {
      if (!id) {
        setProductData({});
        return;
      }
      try {
        setMainLoading(true);
        const response = await fetchProductData(id);
        setProductData(response);
      } catch (e) {
        setMainError("An error occured fetching the data.");
        console.error(e);
      } finally {
        setMainLoading(false);
      }
    }

    loadProductData();
  }, [id]);

  // console.log(customerData);
  let product = Object.keys(productData).length < 1 ? false : productData;

  return (
    <>
      {mainLoading && <p>Information loading...</p>}
      {mainError && <p>An error occured.</p>}
      {!mainLoading && !mainError && (
        <>
          {!product && <h2>No Product Selected</h2>}
          {product && (
            <>
              <div id="customer-info">
                <div className="panel customer-details">
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
                <div className="panel customer-details">
                  <h3>Pricing</h3>
                  <div className="panel-contents">
                    <div className="panel-contents-section">
                      <div className="panel-section-desc">Price:</div>
                      <div className="panel-section-data">
                        <div className="data-item">{product.price}</div>
                      </div>
                    </div>
                    <div className="panel-contents-section">
                      <div className="panel-section-desc">Cost:</div>
                      <div className="panel-section-data">
                        <div className="data-item">{product.cost}</div>
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
