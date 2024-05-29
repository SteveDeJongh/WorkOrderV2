import ProductForm from "./ProductForm";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../services/productServices";
import { objectToFormData } from "../../utils/formDataHelper";

function ProductNew() {
  const navigate = useNavigate();

  async function handleCreateSubmit(rawData) {
    try {
      const formData = objectToFormData({ product: rawData });
      const response = await createProduct(formData);
      console.log(response);
      navigate(`/products/${response.id}/view`);
    } catch (e) {
      console.error("Failed to create post: ", e);
    }
  }

  return (
    <>
      <div className="pane pane-mid">
        <div className="pane-inner">
          <ProductForm
            headerText={`New Product`}
            buttonText={"Create"}
            onSubmit={handleCreateSubmit}
          />
        </div>
      </div>
    </>
  );
}

export default ProductNew;
