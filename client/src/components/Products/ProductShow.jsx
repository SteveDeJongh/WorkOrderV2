import MainPaneNav from "../../multiuse/MainPaneNav";
import { fetchProductData } from "../../services/productServices";
import { Outlet, useParams, useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

function ProductShow() {
  const [selection, setSelection] = useOutletContext();
  let { id } = useParams();

  const { data, isError, isPending, isSuccess } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductData(id),
    staleTime: 1000, // overriding default staleTime
    refetchOnWindowFocus: false, // won't refetch when switching tabs.
  });

  let product;
  if (isSuccess) {
    product = Object.keys(data).length < 1 ? false : data;
  }

  return (
    <>
      <div className="pane pane-mid">
        <div className="pane-inner">
          {isPending && <p>Information loading...</p>}
          {isError && <p>An error occured.</p>}
          {!isPending && !isError && (
            <>
              {!product && <h2>No Product Selected</h2>}
              {product && (
                <>
                  <MainPaneNav
                    title={data.name}
                    id={data.id}
                    identifier={"Product"}
                    pages={["View", "Edit", "Movements"]}
                  />
                  <Outlet
                    context={{
                      selection: [selection, setSelection],
                      productData: { product, isError, isPending, isSuccess },
                    }}
                  />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductShow;
