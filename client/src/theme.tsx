import { createTheme, responsiveFontSizes } from "@mui/material";
import { blue, red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: blue[800],
    },
    secondary: {
      main: red[500],
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // borderRadius: 20,
        },
      },
    },
  },
});

export default responsiveFontSizes(theme);
