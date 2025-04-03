import { MainPaneNav } from "../multiuse/MainPaneNav";
import { fetchProductData } from "../../services/productServices";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Product } from "../../types/products";
import { Box, Typography } from "../../utils/muiImports";
import { CustomTabPanel } from "../Users/CustomTabPanel";
import { ProductView } from "./ProductView";
import { ProductEdit } from "./ProductEdit";
import { ProductMovements } from "./ProductMovements";
import { LoadingBox } from "../multiuse/LoadingBox";

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
    refetchOnWindowFocus: false, // Prevents refetch when switching tabs.
  });

  // Nav Tabs
  const [tab, setTab] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <>
      {isError && (
        <Typography component={"h5"} variant="h5">
          An error occured.
        </Typography>
      )}
      {isPending && <LoadingBox text="Loading Product..." />}
      {!isPending && mainData && (
        <Box p={1}>
          <MainPaneNav
            title={mainData.name}
            id={mainData.id}
            identifier={"Product"}
            pages={["View", "Edit", "Movements"]}
            tab={tab}
            handleChange={handleChange}
          />
          <CustomTabPanel value={tab} index={0}>
            <ProductView mainData={mainData} />
          </CustomTabPanel>
          <CustomTabPanel value={tab} index={1}>
            <ProductEdit
              mainData={mainData}
              setMainData={setMainData}
              setTab={setTab}
            />
          </CustomTabPanel>
          <CustomTabPanel value={tab} index={2}>
            <ProductMovements />
          </CustomTabPanel>
        </Box>
      )}
    </>
  );
}

export { ProductShow };
