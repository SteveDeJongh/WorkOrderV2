import { ProductForm } from "./ProductForm";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../services/productServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditableProductData, Product } from "../../types/products";
import { Box, Typography } from "../../utils/muiImports";

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
      return createProduct({ product: rawData });
    },
    onSuccess: (newProduct: Product) => {
      queryClient.invalidateQueries({ queryKey: ["productsSearch"] });
      navigate(`/products/${newProduct.id}/view`);
    },
  });

  return (
    <Box p={1}>
      <Typography variant="h4">New Product</Typography>
      <br></br>
      <br></br>
      <ProductForm
        headerText={`New Product`}
        buttonText={"Create"}
        onSubmit={handleCreateSubmit}
        onCancel={() => navigate("/products/1")}
      />
    </Box>
  );
}

export { ProductNew };
