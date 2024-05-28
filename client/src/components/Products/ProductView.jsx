import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCustomerData } from "../../services/customerServices";
import { fetchProductData } from "../../services/productServices";

function ProductView() {
  // Todo and change to products view section.

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
                      <div className="panel-section-icon">📞</div>
                      <div className="panel-section-data">
                        <div className="data-item">{product.name}</div>
                        <div className="data-item">
                          {Object.entries(product).toString()}
                        </div>
                      </div>
                    </div>
                    <div className="panel-contents-section">
                      <div className="panel-section-icon">📧</div>
                      <div className="panel-section-data">
                        <div className="data-item">{product.email}</div>
                      </div>
                    </div>
                    <div className="panel-contents-section">
                      <div className="panel-section-icon">🏠</div>
                      <div className="panel-section-data">
                        <div className="data-item">{product.address}</div>
                        <div className="data-item">
                          {product.city} {product.province} {product.postal}
                        </div>
                        <div className="data-item">{product.country}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="panel customer-notices">
                  <h3>Section</h3>
                </div>
                <div className="panel customer-history">
                  <h3>History</h3>
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
