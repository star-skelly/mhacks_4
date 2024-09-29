import "@/styles/globals.css";
import type { AppProps } from "next/app";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const loadFonts = async () => {
      const link = document.createElement('link');
      link.href = 'https://fonts.googleapis.com/css2?family=Titillium+Web&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }

    loadFonts();
  }, [])

  return (
    <Provider store={store}>
      <Component {...pageProps} />;
    </Provider>
  )

}
