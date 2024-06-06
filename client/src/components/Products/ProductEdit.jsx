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
    queryKey: ["product", id],
    queryFn: () => fetchProductData(id),
  });

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (rawData) => {
      const formData = objectToFormData({ product: rawData });
      editProduct(id, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product", id] });
      navigate(`/products/${id}/view`);
    },
  });

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
                onSubmit={mutate}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductEdit;
