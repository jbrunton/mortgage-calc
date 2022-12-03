import React from "react";
import ReactDOM from "react-dom/client";
import { IntlProvider } from "react-intl";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <IntlProvider locale={"en"}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </IntlProvider>
  </React.StrictMode>
);
