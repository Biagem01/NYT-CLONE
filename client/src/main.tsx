import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Provider } from 'react-redux';
import { store } from './redux/store';

import { HelmetProvider } from "react-helmet-async"; // 👈 importa HelmetProvider

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider> {/* 👈 avvolgi App */}
        <App />
      </HelmetProvider>
    </QueryClientProvider>
  </Provider>
);
