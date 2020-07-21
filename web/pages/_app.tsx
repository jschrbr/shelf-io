import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../helpers/theme";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import Dial from "../components/Dial";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);
export default function MyApp(props: any) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles: any = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  const classes = useStyles();

  return (
    <React.Fragment>
      <Head>
        <title>Shelf-io</title>
      </Head>
      <MuiThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              href="/"
            >
              <HomeIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Shelf-io
            </Typography>
          </Toolbar>
        </AppBar>

        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {/* <NavBar headline={ "Shelf-io" } /> */}
        <Component {...pageProps} />
        <Dial />

        <style jsx global>
          {`
            @font-face {
              font-family: "Roboto";
              font-style: normal;
              font-weight: 400;
              src: url("../fonts/roboto-v20-latin-regular.eot"); /* IE9 Compat Modes */
              src: local("Roboto"), local("Roboto-Regular"),
                url("../fonts/roboto-v20-latin-regular.eot?#iefix")
                  format("embedded-opentype"),
                /* IE6-IE8 */ url("../fonts/roboto-v20-latin-regular.woff2")
                  format("woff2"),
                /* Super Modern Browsers */
                  url("../fonts/roboto-v20-latin-regular.woff") format("woff"),
                /* Modern Browsers */
                  url("../fonts/roboto-v20-latin-regular.ttf")
                  format("truetype"),
                /* Safari, Android, iOS */
                  url("../fonts/roboto-v20-latin-regular.svg#Roboto")
                  format("svg"); /* Legacy iOS */
            }
          `}
        </style>
      </MuiThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
