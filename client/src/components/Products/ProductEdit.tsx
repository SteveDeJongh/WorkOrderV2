import { useNavigate, useOutletContext } from "react-router-dom";
import { editProduct } from "../../services/productServices";
import { objectToFormData } from "../../utils/formDataHelper";
import { ProductForm } from "./ProductForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditableProductData, ProductContext } from "../../types/products";

function ProductEdit() {
  const { mainData, setMainData } = useOutletContext<ProductContext>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (rawData: EditableProductData) => {
      const formData = objectToFormData({ product: rawData });
      return editProduct(mainData.id, formData);
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
    <>
      <div className="pane-inner">
        <>
          <ProductForm
            product={mainData}
            headerText={`Edit Product`}
            buttonText={"Save"}
            onSubmit={mutate}
          />
        </>
      </div>
    </>
  );
}

export { ProductEdit };
