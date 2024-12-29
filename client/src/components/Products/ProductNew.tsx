import { ProductForm } from "./ProductForm";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../services/productServices";
import { objectToFormData } from "../../utils/formDataHelper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditableProductData, Product } from "../../types/products";

function ProductNew() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: handleCreateSubmit,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: (rawData: EditableProductData) => {
      const formData = objectToFormData({ product: rawData });
      return createProduct(formData);
    },
    onSuccess: (newProduct: Product) => {
      queryClient.invalidateQueries({ queryKey: ["productsSearch"] });
      navigate(`/products/${newProduct.id}/view`);
    },
  });

  return (
    <>
      <div className="pane-inner">
        <ProductForm
          headerText={`New Product`}
          buttonText={"Create"}
          onSubmit={handleCreateSubmit}
        />
      </div>
    </>
  );
}

export { ProductNew };
