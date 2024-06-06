import MainPaneNav from "../../multiuse/MainPaneNav";
import { fetchProductData } from "../../services/productServices";
import { Outlet, useParams, useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

function ProductShow() {
  const [selection, setSelection] = useOutletContext();

  let { id } = useParams();

  const {
    data: mainData,
    isError: mainError,
    isPending: mainLoading,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductData(id),
  });

  return (
    <>
      <div className="pane pane-mid">
        <div className="pane-inner">
          {mainLoading && <p>Information loading...</p>}
          {mainError && <p>An error occured.</p>}
          {!mainLoading && (
            <>
              <MainPaneNav
                title={mainData.name}
                id={mainData.id}
                identifier={"Product"}
                pages={["View", "Edit", "Movements"]}
              />
              <Outlet context={[selection, setSelection]} />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductShow;
