import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { BrowserRouter } from "react-router-dom";
import { QueryProvider } from "./lib/react-query/QueryProvider.tsx";
import { Dialog } from "./components/ui/dialog.tsx";
import { AlertDialog } from "@/components/ui/alert-dialog.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <AlertDialog>
          <Dialog>
            <App />
          </Dialog>
        </AlertDialog>
      </QueryProvider>
    </BrowserRouter>
  </React.StrictMode>
);
