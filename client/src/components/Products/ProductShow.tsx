import { MainPaneNav } from "../multiuse/MainPaneNav";
import { fetchProductData } from "../../services/productServices";
import { Outlet, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Product } from "../../types/products";

function ProductShow() {
  const [mainData, setMainData] = useState<Product>();
  const { id } = useParams();

  const { isError, isPending } = useQuery({
    queryKey: ["product", { id }],
    queryFn: async () => {
      const response = await fetchProductData(Number(id));
      setMainData(response);
      return response;
    },
    staleTime: 1000, // overriding default staleTime
    refetchOnWindowFocus: false, // won't refetch when switching tabs.
  });

  return (
    <>
      <div className="pane pane-mid">
        <div className="pane-inner">
          {isPending && <p>Information loading...</p>}
          {isError && <p>An error occured.</p>}
          {!isPending && !isError && (
            <>
              {!mainData && <h2>No Product Selected</h2>}
              {mainData && (
                <>
                  <MainPaneNav
                    title={mainData.name}
                    id={mainData.id}
                    identifier={"Product"}
                    pages={["View", "Edit", "Movements"]}
                  />
                  <Outlet context={{ mainData, setMainData }} />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export { ProductShow };
