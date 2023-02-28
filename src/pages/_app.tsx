import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import store from "../store";
import { GlobalStyles } from "../GlobalStyles";
import { StaticRouter } from 'react-router-dom/server';

const theme = {
  colors: {
    primary: "#0070f3",
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
          <StaticRouter>
            <Component {...pageProps} />
          </StaticRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
