import { useOutletContext } from "react-router-dom";
import { NumericFormat } from "react-number-format";

function ProductView() {
  const {
    productData: { product, isError, isPending },
  } = useOutletContext();
  console.log("This is from calling useOutletContext", product);

  return (
    <>
      {isPending && <p>Information loading...</p>}
      {isError && <p>An error occured.</p>}
      {!isPending && !isError && (
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
  );
}

export default ProductView;
