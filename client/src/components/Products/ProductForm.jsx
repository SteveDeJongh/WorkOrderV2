import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from "react";

function ProductForm({ product, headerText, onSubmit, buttonText }) {
  const [inventoried, setInventoried] = useState(
    product ? product.inventory : true
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: product
      ? {
          name: product.name,
          description: product.description,
          sku: product.sku,
          upc: product.upc,
          price: product.price,
          cost: product.cost,
          stock: product.stock,
          min: product.min,
          max: product.max,
          inventory: product.inventory,
          taxrate: product.taxrate,
        }
      : undefined,
  });

  async function onSubmitHandler(data) {
    console.log(data);
    try {
      onSubmit(data);
    } catch (e) {
      console.log("failed!");
    }
  }

  return (
    <>
      <div id="main-pane-header">
        <div id="main-pane-header-title">
          <h2>{headerText}</h2>
          <div className="main-pane-form-actions">
            <button>
              {product && (
                <Link to={`/products/${product.id}/view`}>Cancel</Link>
              )}
              {!product && <Link to={`/products`}>Cancel</Link>}
            </button>
            <button
              form="main-pane-content"
              disabled={isSubmitting}
              type="submit"
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
      <form id="main-pane-content" onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="panel">
          <h3>Details</h3>
          <div className="panel-contents">
            <div className="panel-contents-section">
              <div className="formPair">
                <label htmlFor="name">Name:</label>
                <input
                  {...register("name", {
                    required: "Product Name is required.",
                  })}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Product Name"
                />
                {errors.name && (
                  <p className="error">{`${errors.name.message}`}</p>
                )}
              </div>
            </div>
            <div className="panel-contents-section">
              <div className="formPair">
                <label htmlFor="description">Description:</label>
                <input
                  {...register("description", {
                    required: "Description is required.",
                  })}
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Description"
                />
                {errors.description && (
                  <p className="error">{`${errors.description.message}`}</p>
                )}
              </div>
            </div>
            <div className="panel-contents-section">
              <div className="formPair">
                <label htmlFor="sku">Sku:</label>
                <input
                  {...register("sku", {
                    required: "Sku is required",
                  })}
                  type="sku"
                  id="sku"
                  name="sku"
                  placeholder="PR0001"
                />
                {errors.sku && (
                  <p className="error">{`${errors.sku.message}`}</p>
                )}
              </div>
            </div>
            <div className="panel-contents-section">
              <div className="formPair">
                <label htmlFor="upc">UPC:</label>
                <input
                  {...register("upc", {
                    required: "UPC is required",
                    pattern: {
                      value: /^\d{0,12}$/,
                      message: "Please enter a valid UPC",
                    },
                  })}
                  type="upc"
                  id="upc"
                  name="upc"
                  placeholder="123123123123"
                />
                {errors.upc && (
                  <p className="error">{`${errors.upc.message}`}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="panel">
          <h3>Pricing</h3>
          <div className="panel-contents">
            <div className="panel-contents-section">
              <div className="formPair half">
                <label htmlFor="price">Price:</label>
                <input
                  {...register("price")}
                  type="string"
                  id="price"
                  name="price"
                  placeholder="9.99"
                />
                {errors.price && (
                  <p className="error">{`${errors.price.message}`}</p>
                )}
              </div>
              {/* </div>
            <div className="panel-contents-section"> */}
              <div className="formPair half">
                <label htmlFor="cost">Cost:</label>
                <input
                  {...register("cost")}
                  type="string"
                  id="cost"
                  name="cost"
                  placeholder="9.99"
                />
                {errors.cost && (
                  <p className="error">{`${errors.cost.message}`}</p>
                )}
              </div>
            </div>
            <div className="panel-contents-section">
              <div className="formPair">
                <label htmlFor="taxrate">Tax rate:</label>
                <input
                  {...register("taxrate")}
                  type="string"
                  id="taxrate"
                  name="taxrate"
                  placeholder="1"
                />
                {errors.taxrate && (
                  <p className="error">{`${errors.taxrate.message}`}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="panel">
          <h3>Inventory Options</h3>
          <div className="panel-contents">
            <div className="panel-contents-section">
              <div className="formPair">
                <label htmlFor="inventory">Inventory?</label>
                <input
                  id="inventory"
                  type="checkbox"
                  placeholder="inventory"
                  defaultChecked={inventoried}
                  onChange={(e) => {
                    setInventoried(e.target.checked);
                  }}
                  {...register("inventory")}
                />
                {errors.inventory && (
                  <p className="error">{`${errors.inventory.message}`}</p>
                )}
              </div>
            </div>
            <div
              id="inventoryDetails"
              style={{ display: inventoried ? "" : "none" }}
            >
              <div className="panel-contents-section">
                <div className="formPair third">
                  <label htmlFor="stock">Stock:</label>
                  <input
                    {...register("stock")}
                    type="string"
                    id="stock"
                    name="stock"
                    placeholder="10"
                  />
                  {errors.stock && (
                    <p className="error">{`${errors.stock.message}`}</p>
                  )}
                </div>
                <div className="formPair third">
                  <label htmlFor="min">Min:</label>
                  <input
                    {...register("min")}
                    type="string"
                    id="min"
                    name="min"
                    placeholder="1"
                  />
                  {errors.min && (
                    <p className="error">{`${errors.min.message}`}</p>
                  )}
                </div>
                <div className="formPair third">
                  <label htmlFor="max">Max:</label>
                  <input
                    {...register("max")}
                    type="string"
                    id="max"
                    name="max"
                    placeholder="100"
                  />
                </div>
              </div>
            </div>
          </div>
          {errors.max && <p className="error">{`${errors.max.message}`}</p>}
        </div>
      </form>
    </>
  );
}

export default ProductForm;
