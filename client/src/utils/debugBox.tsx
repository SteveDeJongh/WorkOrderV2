import { Box } from "@mui/material";
import { ReactNode } from "react";

const DebugBox = ({
  children,
  color = "red",
  label = "",
  ...props
}: {
  children: ReactNode,
  color?: string,
  label?: string,
  [key: string]: any,
}) => {
  return (
    <Box
      {...props}
      sx={{
        border: `1px dashed ${color}`,
        position: "relative",
        ...props.sx,
      }}
    >
      {label && (
        <Box
          sx={{
            position: "absolute",
            top: -10,
            left: 5,
            fontSize: 10,
            color,
            backgroundColor: "white",
            px: 0.5,
            zIndex: 10,
          }}
        >
          {label}
        </Box>
      )}
      {children}
    </Box>
  );
};
export { DebugBox };
