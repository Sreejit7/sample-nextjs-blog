import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Layout } from "../components";
import { ModalContextProvider } from "../contexts/useModalContext";
import { Modal } from "../components";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ModalContextProvider>
      <>
        <Modal />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </>
    </ModalContextProvider>
  );
}

export default MyApp;
