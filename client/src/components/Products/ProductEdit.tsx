import { useParams, useNavigate } from "react-router-dom";
import { fetchProductData, editProduct } from "../../services/productServices";
import { objectToFormData } from "../../utils/formDataHelper";
import ProductForm from "./ProductForm";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

function ProductEdit() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  let { id } = useParams();

  const {
    data: product,
    isError: mainError,
    isPending: mainLoading,
  } = useQuery({
    queryKey: ["editProduct", id],
    queryFn: () => fetchProductData(id as string),
  });

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (rawData) => {
      const formData = objectToFormData({ product: rawData });
      return editProduct(id as string, formData);
    },
    onSuccess: (newProduct) => {
      queryClient.invalidateQueries({ queryKey: ["editProduct", id] });
      // queryClient.setQueryData(["editProduct", id], (oldProduct) => {
      //   return newProduct;
      // });
      navigate(`/products/${id}/view`);
    },
  });

  return (
    <>
      <div className="pane-inner">
        {mainLoading && <p>Information loading...</p>}
        {mainError && <p>An error occured.</p>}
        {!mainLoading && !mainError && (
          <>
            <ProductForm
              product={product}
              headerText={`Edit Product`}
              buttonText={"Save"}
              onSubmit={mutate}
            />
          </>
        )}
      </div>
    </>
  );
}

export default ProductEdit;
