import { useNavigate } from "react-router-dom";
import { editProduct } from "../../services/productServices";
import { ProductForm } from "./ProductForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditableProductData, Product } from "../../types/products";

type Props = {
  mainData: Product;
  setMainData: React.Dispatch<React.SetStateAction<Product | undefined>>;
  setTab: React.Dispatch<React.SetStateAction<number>>;
};

function ProductEdit({ mainData, setMainData, setTab }: Props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (rawData: EditableProductData) => {
      return editProduct(mainData.id, { product: rawData });
    },
    onSuccess: (editedProduct) => {
      queryClient.invalidateQueries({ queryKey: ["productsSearch"] });
      queryClient.setQueryData(["product", { id: editedProduct.id }], () => {
        return editedProduct;
      });
      setMainData(editedProduct);
      navigate(`/products/${editedProduct.id}/view`);
    },
  });

  return (
    <ProductForm
      product={mainData}
      headerText={`Edit Product`}
      buttonText={"Save"}
      onSubmit={mutate}
      onCancel={() => setTab(0)}
    />
  );
}

export { ProductEdit };
