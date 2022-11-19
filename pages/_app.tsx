import "../styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "../app/store";
import { Provider } from "react-redux";
import { DragDropContextProvider } from "../components/DragDropContextProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <DragDropContextProvider>
        <Component {...pageProps} />
      </DragDropContextProvider>
    </Provider>
  );
}

export default MyApp;
