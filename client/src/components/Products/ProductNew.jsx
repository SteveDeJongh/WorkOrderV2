import ProductForm from "./ProductForm";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../services/productServices";
import { objectToFormData } from "../../utils/formDataHelper";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function ProductNew() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: handleCreateSubmit,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: (rawData) => {
      const formData = objectToFormData({ product: rawData });
      console.log("Creating product...");
      return createProduct(formData);
    },
    onSuccess: (newProduct) => {
      console.log("Product created!");
      console.log(newProduct);
      // queryClient.setQueryData(["products"], (oldProducts) => {
      //   [...oldProducts, newProduct];
      // });
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

export default ProductNew;
