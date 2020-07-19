import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const dialStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 380,
      transform: "translateZ(0px)",
      flexGrow: 1,
    },
    speedDial: {
      position: "absolute",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  })
);

export function CardStyle() {
  return (
    <style>
      {`
        a {
          color: #0070f3;
          text-decoration: none;
        }
      `}
    </style>
  );
}

export const HomeStyle = () => {
  return (
    <style>
      {`
        body {
          background-color: rgb(235, 235, 235);
        }

        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}
    </style>
  );
};

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
