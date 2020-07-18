import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#556cd6",
        },
        secondary: {
            main: "#19857b",
        },
        error: {
            main: red.A400,
        },
        background: {
            default: "#fff",
        },
    },
    navBar: {
        root: {
            flexGrow: 1,
        },
        title: {
            flexGrow: 1,
        },
    },
} as any);
// const theme = {
//   palette: {
//     primary: {
//       main: "#556cd6",
//     },
//     secondary: {
//       main: "#19857b",
//     },
//     error: {
//       main: red.A400,
//     },
//     background: {
//       default: "#fff",
//     },
//   },
//   navBar: {
//     root: {
//       flexGrow: 1,
//     },
//     title: {
//       flexGrow: 1,
//     },
//   },
// };

export default theme;
