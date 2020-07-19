import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import theme from "../helpers/theme";

// import NavBar from "../src/components/NavBar";

export default function MyApp(props: any) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles: any = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Shelf-io</title>
      </Head>

      <MuiThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {/* <NavBar headline={ "Shelf-io" } /> */}
        <Component {...pageProps} />

        <style jsx global>{`
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
              /* Modern Browsers */ url("../fonts/roboto-v20-latin-regular.ttf")
                format("truetype"),
              /* Safari, Android, iOS */
                url("../fonts/roboto-v20-latin-regular.svg#Roboto")
                format("svg"); /* Legacy iOS */
          }
        `}</style>
      </MuiThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
