import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { IntlProvider } from "react-intl";
import { ChakraProvider } from "@chakra-ui/react";
import { router } from "./router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <IntlProvider locale={"en"}>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </IntlProvider>
  </React.StrictMode>,
);
