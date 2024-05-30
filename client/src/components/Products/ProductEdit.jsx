import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductData, editProduct } from "../../services/productServices";
import { objectToFormData } from "../../utils/formDataHelper";
import ProductForm from "./ProductForm";

function ProductEdit() {
  const [mainLoading, setMainLoading] = useState(false);
  const [mainError, setMainError] = useState(false);
  const [product, setProduct] = useState({});
  const navigate = useNavigate();

  let { id } = useParams();
  useEffect(() => {
    async function loadProductData() {
      if (!id) {
        setProduct({});
        return;
      }
      try {
        setMainLoading(true);
        const response = await fetchProductData(id);
        setProduct(response);
      } catch (e) {
        setMainError("An error occured fetching the data.");
        console.error(e);
      } finally {
        setMainLoading(false);
      }
    }

    loadProductData();
  }, [id]);

  async function handleEditSubmit(rawData) {
    try {
      const formData = objectToFormData({ product: rawData });
      await editProduct(id, formData);
      navigate(`/products/${id}/view`);
    } catch (e) {
      console.error("Failed to create product: ", e);
    }
  }

  return (
    <>
      <div className="pane pane-mid">
        <div className="pane-inner">
          {mainLoading && <p>Information loading...</p>}
          {mainError && <p>An error occured.</p>}
          {!mainLoading && !mainError && (
            <>
              <ProductForm
                product={product}
                headerText={`Edit Product`}
                buttonText={"Save"}
                onSubmit={handleEditSubmit}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductEdit;
